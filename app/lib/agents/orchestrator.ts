import { openRouterConfig } from "@/config/open-router";
import { orchestratorConfig } from "@/config/orchestrator";
import { OrhcestratorDebateEntry } from "@/types/orchestrator";
import { ChatOpenAI } from "@langchain/openai";
import { BaseMessage, HumanMessage, SystemMessage } from "langchain";
import { z } from "zod";
import {
  buildDebateAgentPrompt,
  buildDetermineIntentRolePrompt,
  buildDetermineIntentTaskPrompt,
  buildHandleConversationRolePrompt,
  buildHandleConversationTaskPrompt,
  buildVerdictPrompt,
} from "./orchestrator-prompts";
import {
  callAccountManagerAgent,
  callDebateAgent,
  parseVerdictOutcome,
} from "./orchestrator-utils";

const model = new ChatOpenAI({
  model: openRouterConfig.model,
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  configuration: {
    baseURL: openRouterConfig.baseUrl,
  },
  temperature: 0.7,
});

const determineIntentSchema = z.object({
  intent: z
    .enum(["debate", "account-management", "conversation"])
    .describe("The determined intent of the user message"),
  topic: z
    .string()
    .optional()
    .describe(
      "If intent is debate, a concise but comprehensive summary of the topic to debate. Include the specific token, the proposed action, and any reasoning provided by the user.",
    ),
  accountManagement: z
    .string()
    .optional()
    .describe(
      "If intent is account-management, the specific instruction or request (e.g., execute swap, get address, get balance, list supported chains/tokens) to send to the account manager",
    ),
});

async function determineIntent(messages: BaseMessage[]) {
  const intentMessages = [
    new SystemMessage(buildDetermineIntentRolePrompt()),
    new HumanMessage(buildDetermineIntentTaskPrompt(messages)),
  ];
  const structuredModel = model.withStructuredOutput(determineIntentSchema);
  return await structuredModel.invoke(intentMessages);
}

async function* handleConversation(
  messages: BaseMessage[],
): AsyncGenerator<string> {
  const conversationMessages = [
    new SystemMessage(buildHandleConversationRolePrompt()),
    new HumanMessage(buildHandleConversationTaskPrompt(messages)),
  ];
  const response = await model.invoke(conversationMessages);
  const content =
    typeof response.content === "string"
      ? response.content
      : JSON.stringify(response.content);

  yield `data: ${JSON.stringify({
    role: "orchestrator",
    type: "final",
    content: content,
  })}\n\n`;

  yield `data: [DONE]\n\n`;
}

async function* handleDebate(topic: string): AsyncGenerator<string> {
  const debateHistory: OrhcestratorDebateEntry[] = [];

  // Run the debate rounds sequentially
  for (const round of orchestratorConfig.debateRounds) {
    yield `data: ${JSON.stringify({
      role: "orchestrator",
      type: "thinking",
      content: round.thinkingLabel,
    })}\n\n`;

    const prompt = buildDebateAgentPrompt(
      topic,
      debateHistory,
      round.instruction,
    );
    const response = await callDebateAgent(round.agent, prompt);

    debateHistory.push({ role: round.agent, content: response });

    yield `data: ${JSON.stringify({
      role: round.agent,
      type: "message",
      content: response,
    })}\n\n`;
  }

  // Orchestrator delivers the verdict
  yield `data: ${JSON.stringify({
    role: "orchestrator",
    type: "thinking",
    content: "Shark Council deliberates...",
  })}\n\n`;

  const verdictPrompt = buildVerdictPrompt(topic, debateHistory);
  const verdictResponse = await model.invoke([new HumanMessage(verdictPrompt)]);
  const verdict =
    typeof verdictResponse.content === "string"
      ? verdictResponse.content
      : JSON.stringify(verdictResponse.content);

  yield `data: ${JSON.stringify({
    role: "orchestrator",
    type: "final",
    content: verdict,
  })}\n\n`;

  const { decision, accountManagementInstruction } =
    parseVerdictOutcome(verdict);

  if (decision === "APPROVE" && accountManagementInstruction) {
    yield `data: ${JSON.stringify({
      role: "orchestrator",
      type: "thinking",
      content: "Processing account management request...",
    })}\n\n`;

    try {
      const accountManagementResponse = await callAccountManagerAgent(
        accountManagementInstruction,
      );

      yield `data: ${JSON.stringify({
        role: "orchestrator",
        type: "final",
        content: accountManagementResponse,
      })}\n\n`;
    } catch (e: unknown) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      yield `data: ${JSON.stringify({
        role: "orchestrator",
        type: "final",
        content: `Account management failed: ${errorMessage}`,
      })}\n\n`;
    }
  }

  yield `data: [DONE]\n\n`;
}

async function* handleAccountManagement(
  accountManagement: string,
): AsyncGenerator<string> {
  yield `data: ${JSON.stringify({
    role: "orchestrator",
    type: "thinking",
    content: "Processing account management request...",
  })}\n\n`;

  try {
    const response = await callAccountManagerAgent(accountManagement);

    yield `data: ${JSON.stringify({
      role: "orchestrator",
      type: "final",
      content: response,
    })}\n\n`;
  } catch (e: unknown) {
    const errorMessage = e instanceof Error ? e.message : String(e);
    yield `data: ${JSON.stringify({
      role: "orchestrator",
      type: "final",
      content: `Account management failed: ${errorMessage}`,
    })}\n\n`;
  }

  yield `data: [DONE]\n\n`;
}

export async function* streamOrchestrator(
  messages: BaseMessage[],
): AsyncGenerator<string> {
  const { intent, accountManagement, topic } = await determineIntent(messages);

  if (intent === "debate" && topic) {
    yield* handleDebate(topic);
  } else if (intent === "account-management" && accountManagement) {
    yield* handleAccountManagement(accountManagement);
  } else {
    yield* handleConversation(messages);
  }
}
