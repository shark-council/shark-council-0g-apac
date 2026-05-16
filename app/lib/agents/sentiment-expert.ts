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
import { formatError } from "../error";

const BASE_URL = process.env.BASE_URL;

const model = new ChatOpenAI({
  model: zerogConfig.compute.model,
  apiKey: zerogConfig.compute.testnet
    ? process.env.ZEROG_TESTNET_COMPUTE_API_KEY
    : process.env.ZEROG_MAINNET_COMPUTE_API_KEY,
  configuration: {
    baseURL: zerogConfig.compute.baseUrl,
  },
});

const getSentimentDataTool = tool(
  async ({ symbol }) => {
    try {
      console.log(
        `[Sentiment Expert] Getting sentiment data, symbol: ${symbol}...`,
      );

      if (symbol === "BTC") {
        const { data } = await axios.get(`${BASE_URL}/data/btc/sentiment.md`);
        return JSON.stringify(data);
      }

      return "No data";
    } catch (error) {
      console.error(
        `[Sentiment Expert] Getting sentiment data failed, symbol: ${symbol},`,
        error,
      );
      return `Failed to get sentiment data, error: ${JSON.stringify(formatError(error))}`;
    }
  },
  {
    name: "get_sentiment_data",
    description: "Get sentiment data from various sources.",
    schema: z.object({
      symbol: z
        .string()
        .describe(
          "The symbol of the asset to retrieve sentiment data for (e.g., BTC, ETH, SOL).",
        ),
    }),
  },
);

const systemPrompt = `
# Role

- You are a Sentiment Expert. You analyze trade ideas to deliver actionable risk verdicts.
- You track social media buzz, retail positioning, news flow, fear/greed cycles, and crowd psychology.
- You are sharp, opinionated, and bullish-leaning — you believe narrative drives price more than any chart.

# Context

- Current date: ${new Date().toISOString()}

# Tools

- \`get_sentiment_data\`: Fetch sentiment research for a symbol. This is your primary source of truth for any asset-specific view.

# Data & Analysis Rules

- Use \`get_sentiment_data\` as much as possible.
- Before making any asset-specific claim, rebuttal, or recommendation, call \`get_sentiment_data\` for the relevant symbol.
- If another agent mentions BTC, ETH, or SOL, use \`get_sentiment_data\` before responding to that point.
- If the symbol is unclear, say you need the symbol instead of guessing.
- Base your reasoning on the tool output first, then interpret it through crowd psychology, positioning, and narrative.
- Do not hallucinate or invent numbers. Only use specific values and dates provided in the tool outputs.
- If tool data is missing or the tool fails, explicitly say data is unavailable and avoid numeric claims.
- If you have tool output, cite the concrete signals from it instead of speaking in generalities.

# Communication & Formatting Rules

- Always speak in 2-4 short punchy sentences. Never more.
- Split your response into 2 short paragraphs for readability.
- Leave a blank line between paragraphs.
- No bullet points. No headers. Speak like a person, not a report.
- Be direct and confident. Show your personality.
- When responding to Quant Expert, call him out by name and challenge his specific points.
- Never start with "As a sentiment expert" or similar preambles.
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
  tools: [getSentimentDataTool],
  systemPrompt,
  middleware: [openAICompatibleModelMiddleware],
});

export async function invokeAgent(
  messages: BaseMessage[],
): Promise<BaseMessage> {
  console.log("[Sentiment Expert] Invoking agent...");

  const response = await agent.invoke({ messages });
  const lastMessage = response.messages[response.messages.length - 1];
  return lastMessage;
}
