export type OrhcestratorDebateAgentRole = "sentiment-expert" | "quant-expert";

export type OrhcestratorDebateEntry = {
  role: OrhcestratorDebateAgentRole;
  content: string;
};

export type OrhcestratorDebateRound = {
  agent: OrhcestratorDebateAgentRole;
  thinkingLabel: string;
  instruction: string;
};
