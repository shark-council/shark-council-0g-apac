export type DebateChatMessageRole =
  | "user"
  | "orchestrator"
  | "sentiment-expert"
  | "quant-expert";

export type DebateChatMessageType = "thinking" | "message" | "final";

export type DebateChatMessage = {
  id: string;
  role: DebateChatMessageRole;
  type: DebateChatMessageType;
  content: string;
};

export type Debate = {
  id: string;
  idea: string;
  agentIds: string[];
  agentRewardTokenSymbol: string;
  agentRewardTokenAmount: number;
  messages: DebateChatMessage[];
  dexScreenerUrl?: string;
  uniswapTrade?: {
    chain: string;
    tokenSymbol: string;
    tokenUrl: string;
    status: "Open" | "Closed";
    entry: {
      date: Date;
      tokenPrice: number;
      tokenAmount: number;
      transactionHash: string;
      transactionUrl: string;
    };
    exit?: {
      date: Date;
      tokenPrice: number;
      tokenAmount: number;
      transactionHash: string;
      transactionUrl: string;
      pnlPercentage: number;
    };
  };
};
