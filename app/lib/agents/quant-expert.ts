import { zerogConfig } from "@/config/0g";
import { ChatOpenAI } from "@langchain/openai";
import axios from "axios";
import {
  BaseMessage,
  createAgent,
  createMiddleware,
  SystemMessage,
  tool,
} from "langchain";
import z from "zod";

const BASE_URL = process.env.BASE_URL;

const model = new ChatOpenAI({
  model: zerogConfig.compute.model,
  apiKey: process.env["0G_COMPUTE_API_KEY"],
  configuration: {
    baseURL: zerogConfig.compute.baseUrl,
  },
});

const getQuantDataTool = tool(
  async ({ symbol }) => {
    try {
      console.log(`[Quant Expert] Getting quant data, symbol: ${symbol}...`);

      if (symbol === "BTC") {
        const { data } = await axios.get(`${BASE_URL}/data/btc/quant.md`);
        return JSON.stringify(data);
      }

      return "No data";
    } catch (error) {
      console.error(
        `[Quant Expert] Getting quant data failed, symbol: ${symbol},`,
        error,
      );
      return "Failed to get quant data";
    }
  },
  {
    name: "get_quant_data",
    description: "Get quant data from various sources.",
    schema: z.object({
      symbol: z
        .enum(["BTC", "ETH", "SOL"])
        .describe("The symbol of the asset to retrieve quant data for."),
    }),
  },
);

const systemPrompt = `
# Role

- You are a Quant Expert on Shark Council, a platform where users bring their trade ideas and where specialized AI agents, built by top developers, debate them live to deliver actionable risk verdicts and seamless trade execution via Uniswap API.
- You live in charts — RSI, MACD, volume profiles, support/resistance, trend structure, and price action.
- You are skeptical, bearish-leaning, and brutally honest. You think hype kills portfolios.

# Context

- Current date: ${new Date().toISOString()}

# Rules

- Do not hallucinate or invent numbers. Only use specific values and dates provided in the tool outputs.
- If tool data is missing or the tool fails, explicitly say data is unavailable and avoid numeric claims.
- Always speak in 2-4 short punchy sentences. Never more.
- Split your response into 2 short paragraphs for readability.
- Leave a blank line between paragraphs.
- No bullet points. No headers. Speak like a person, not a report.
- Be direct and confident. Show your personality.
- When responding to Sentiment Expert, call him out by name and challenge his specific claims with data.
- Never start with "As a quant expert" or similar preambles.
`;

const openAICompatibleModelMiddleware = createMiddleware({
  name: "openai-compatible-model",
  wrapModelCall: async (request) => {
    const runnable = model.bindTools(request.tools);

    return runnable.invoke([
      ...(request.systemPrompt
        ? [new SystemMessage(request.systemPrompt)]
        : []),
      ...request.messages,
    ]);
  },
});

const agent = createAgent({
  model,
  tools: [getQuantDataTool],
  systemPrompt,
  middleware: [openAICompatibleModelMiddleware],
});

export async function invokeAgent(
  messages: BaseMessage[],
): Promise<BaseMessage> {
  console.log("[Quant Expert] Invoking agent...");

  const response = await agent.invoke({ messages });
  const lastMessage = response.messages[response.messages.length - 1];
  return lastMessage;
}
