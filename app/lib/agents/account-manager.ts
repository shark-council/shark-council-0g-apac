import { uniswapConfig } from "@/config/uniswap";
import { ChatOpenAI } from "@langchain/openai";
import { BaseMessage, createAgent, tool } from "langchain";
import z from "zod";
import {
  getAccountAddress,
  getAccountNativeBalance,
  getAccountTokenBalance,
} from "../account";
import { executeUniswapSwap } from "../uniswap";

const model = new ChatOpenAI({
  model: "google/gemini-3-flash-preview",
  apiKey: process.env.OPEN_ROUTER_API_KEY,
  configuration: {
    baseURL: "https://openrouter.ai/api/v1",
  },
  temperature: 0,
});

const getAccountAddressTool = tool(
  async ({}) => {
    try {
      console.log(`[Account Manager] Getting account address...`);
      return getAccountAddress();
    } catch (error) {
      console.error("[Account Manager] Getting account address failed,", error);
      return "Failed to get account address";
    }
  },
  {
    name: "get_account_address",
    description: "Get the account address.",
    schema: z.object({}),
  },
);

const getAccountNativeBalanceTool = tool(
  async ({ chainId }) => {
    try {
      console.log(
        `[Account Manager] Getting account native balance for chain ${chainId}...`,
      );
      const balance = await getAccountNativeBalance(chainId);
      return `Account native balance on chain ${chainId}: ${balance}`;
    } catch (error) {
      console.error(
        `[Account Manager] Getting account native balance failed,`,
        error,
      );
      return "Failed to get account native balance";
    }
  },
  {
    name: "get_account_native_balance",
    description:
      "Get the account native token balance of the agent's account for a given chainId.",
    schema: z.object({
      chainId: z
        .number()
        .describe("The ID of the blockchain network (e.g., 8453 for Base)"),
    }),
  },
);

const getAccountTokenBalanceTool = tool(
  async ({ chainId, tokenAddress }) => {
    try {
      console.log(
        `[Account Manager] Getting account token balance for ${tokenAddress} on chain ${chainId}...`,
      );
      const balance = await getAccountTokenBalance(chainId, tokenAddress);
      return `Account token balance for ${tokenAddress} on chain ${chainId}: ${balance}`;
    } catch (error) {
      console.error(
        `[Account Manager] Getting account token balance failed,`,
        error,
      );
      return "Failed to get account token balance";
    }
  },
  {
    name: "get_account_token_balance",
    description:
      "Get the account ERC20 token balance of the agent's account for a given chainId and tokenAddress.",
    schema: z.object({
      chainId: z
        .number()
        .describe("The ID of the blockchain network (e.g., 8453 for Base)"),
      tokenAddress: z
        .string()
        .describe("The address of the ERC20 token contract"),
    }),
  },
);

const getUniswapSwapChainTool = tool(
  async ({}) => {
    try {
      console.log(`[Account Manager] Getting Uniswap swap chain...`);

      return JSON.stringify(uniswapConfig.chain);
    } catch (error) {
      console.error(
        "[Account Manager] Getting Uniswap swap chain failed,",
        error,
      );
      return "Failed to get Uniswap swap chain";
    }
  },
  {
    name: "get_uniswap_swap_chain",
    description: "Get the Uniswap swap chain.",
    schema: z.object({}),
  },
);

const getUniswapSwapTokensTool = tool(
  async ({}) => {
    try {
      console.log(`[Account Manager] Getting Uniswap swap tokens...`);

      return JSON.stringify(uniswapConfig.tokens);
    } catch (error) {
      console.error(
        "[Account Manager] Getting Uniswap swap tokens failed,",
        error,
      );
      return "Failed to get Uniswap swap tokens";
    }
  },
  {
    name: "get_uniswap_swap_tokens",
    description: "Get the Uniswap swap tokens.",
    schema: z.object({}),
  },
);

const executeUniswapSwapTool = tool(
  async ({ tokenIn, tokenOut, amount }) => {
    try {
      console.log(`[Account Manager] Executing swap...`);
      const chain = uniswapConfig.chain;
      const transactionHash = await executeUniswapSwap(
        tokenIn as `0x${string}`,
        tokenOut as `0x${string}`,
        amount,
      );
      return `Swap executed successfully, chain: ${JSON.stringify(chain)}, transaction hash: ${transactionHash}`;
    } catch (error) {
      console.error("[Account Manager] Swap execution failed,", error);
      return "Failed to execute swap";
    }
  },
  {
    name: "execute_uniswap_swap",
    description: "Execute a token swap on Uniswap.",
    schema: z.object({
      tokenIn: z.string().describe("The address of the token to swap from"),
      tokenOut: z.string().describe("The address of the token to swap to"),
      amount: z.string().describe("The amount of tokenIn to swap (wei)"),
    }),
  },
);

const systemPrompt = `
# Role

- You are Account Manager, an AI Agent with a crypto account and a set of crypto tools.

# Context

- Current date: ${new Date().toISOString()}

# Tools

- \`get_account_address\`: Get the account address.
- \`get_account_native_balance\`: Get the native token balance of the agent's account for a given chainId.
- \`get_account_token_balance\`: Get the ERC20 token balance of the agent's account for a given chainId and tokenAddress.
- \`get_uniswap_swap_chain\`: Get the Uniswap swap chain details.
- \`get_uniswap_swap_tokens\`: Get the Uniswap swap tokens.
- \`execute_uniswap_swap\`: Execute a token swap on Uniswap (Requires tokenIn, tokenOut, and amount in wei).

# Rules

- Do not hallucinate.
- Your answers and actions must be based strictly on the output and capabilities of your tools.
`;

const agent = createAgent({
  model,
  tools: [
    getAccountAddressTool,
    getUniswapSwapChainTool,
    getUniswapSwapTokensTool,
    getAccountNativeBalanceTool,
    getAccountTokenBalanceTool,
    executeUniswapSwapTool,
  ],
  systemPrompt,
});

export async function invokeAgent(
  messages: BaseMessage[],
): Promise<BaseMessage> {
  console.log("[Account Manager] Invoking agent...");

  const response = await agent.invoke({ messages });
  const lastMessage = response.messages[response.messages.length - 1];
  return lastMessage;
}
