export type DebateFee = {
  chainName: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenAmount: string;
};

export type DebateAgentReward = {
  chainName: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenAmount: string;
};

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

export type DebateUniswapTradeStatus = "pending" | "open" | "closed";

export type DebateDexScreenerData = {
  chainName: string;
  pairAddress: string;
};

export type DebateUniswapTradeEntry = {
  date: Date;
  tokenPrice: number;
  tokenAmount: string;
  transactionHash: string;
  transactionUrl: string;
};

export type DebateUniswapTradeExit = {
  date: Date;
  tokenPrice: number;
  tokenAmount: string;
  transactionHash: string;
  transactionUrl: string;
};

export type DebateUniswapTrade = {
  chainName: string;
  tokenSymbol: string;
  tokenDecimals: number;
  tokenAddress: string;
  tokenUrl: string;
  status: DebateUniswapTradeStatus;
  dexScreenerData?: DebateDexScreenerData;
  entry?: DebateUniswapTradeEntry;
  exit?: DebateUniswapTradeExit;
  pnlPercentage?: number;
};

export type Debate = {
  id: string;
  fee: DebateFee;
  agentIds: string[];
  agentReward: DebateAgentReward;
  idea: string;
  messages: DebateChatMessage[];
  uniswapTrade?: DebateUniswapTrade;
};
