import { appConfig } from "@/config/app";
import { ApiResponse } from "@/types/api";
import {
  OrhcestratorDebateAgentRole,
  OrhcestratorDebateEntry,
} from "@/types/orchestrator";
import { BaseMessage } from "langchain";

export async function callDebateAgent(
  role: OrhcestratorDebateAgentRole,
  prompt: string,
): Promise<string> {
  const res = await fetch(`${appConfig.baseUrl}/api/agents/${role}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: prompt }),
  });
  const data: ApiResponse<{ response: string }> = await res.json();
  if (!data.isSuccess || !data.data) {
    throw new Error(`${role} agent returned an error`);
  }
  return data.data.response;
}

export async function callAccountManagerAgent(
  message: string,
): Promise<string> {
  const res = await fetch(`${appConfig.baseUrl}/api/agents/account-manager`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  const data: ApiResponse<{ response: string }> = await res.json();
  if (!data.isSuccess || !data.data) {
    throw new Error(
      data.error?.message || "Account manager agent returned an error",
    );
  }

  return data.data.response;
}

export function buildDebateTranscript(history: OrhcestratorDebateEntry[]) {
  let transcript = "";
  for (const entry of history) {
    const name =
      entry.role === "sentiment-expert" ? "Sentiment Expert" : "Quant Expert";
    const cleanContent = entry.content.replace(/\n+/g, " ");
    transcript += `${name}: ${cleanContent}\n\n`;
  }

  return transcript;
}

export function parseVerdictOutcome(verdict: string): {
  decision: "APPROVE" | "REJECT" | null;
  accountManagementInstruction?: string;
} {
  const decisionMatch = verdict.match(/^Decision:\s*(APPROVE|REJECT)\b/im);
  const decision = decisionMatch?.[1]?.toUpperCase() as
    | "APPROVE"
    | "REJECT"
    | undefined;

  if (decision !== "APPROVE") {
    return {
      decision: decision ?? null,
    };
  }

  const suggestedTradeMatch = verdict.match(/^Suggested Trade:\s*(.+)$/im);

  return {
    decision,
    accountManagementInstruction: suggestedTradeMatch?.[1]?.trim(),
  };
}

export function buildConversationTranscript(messages: BaseMessage[]): string {
  return messages
    .map((m) => {
      const role = m.type === "human" ? "User" : "Assistant";
      const content =
        typeof m.content === "string" ? m.content : JSON.stringify(m.content);
      const cleanContent = content.replace(/\n+/g, " ");
      return `${role}: ${cleanContent}`;
    })
    .join("\n");
}
