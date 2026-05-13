export type Agent = {
  id: string;
  identity: AgentIdentity;
  reputation: AgentReputation;
};

export type AgentIdentity = {
  name: string;
  description: string;
  image: string;
  capabilities: string[];
  endpoint: string;
};

export type AgentReputation = {
  debates: number;
  totalTrades: number;
  closedTrades: number;
  winningTrades: number;
  losingTrades: number;
};
