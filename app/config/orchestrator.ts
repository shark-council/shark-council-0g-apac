import { OrhcestratorDebateRound } from "@/types/orchestrator";

const debateRounds: OrhcestratorDebateRound[] = [
  {
    agent: "sentiment-expert",
    thinkingLabel: "Sentiment Expert is sizing up the room...",
    instruction:
      "Open the debate. State your position on this topic. What does the crowd say?",
  },
  {
    agent: "quant-expert",
    thinkingLabel: "Quant Expert is pulling up the charts...",
    instruction:
      "Respond to Sentiment Expert directly. What does the chart say? Challenge their specific claims.",
  },
  {
    agent: "sentiment-expert",
    thinkingLabel: "Sentiment Expert is firing back...",
    instruction:
      "Push back on Quant Expert's specific technical arguments. Why are they missing the bigger picture?",
  },
  {
    agent: "quant-expert",
    thinkingLabel: "Quant Expert is checking the data one more time...",
    instruction:
      "Final word. Stand your ground or concede specific points — but be clear about the risk here.",
  },
];

export const orchestratorConfig = {
  debateRounds,
} as const;
