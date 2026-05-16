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
      "Respond to Sentiment Expert directly. What does the chart say? If you disagree, challenge their specific claims. If you agree, build on their points with technical evidence and highlight any potential hidden risks.",
  },
  {
    agent: "sentiment-expert",
    thinkingLabel: "Sentiment Expert is firing back...",
    instruction:
      "Respond to Quant Expert. If you disagree, push back on their specific technical arguments and explain why they are missing the bigger picture. If you agree, reinforce the consensus and highlight any new external factors or market sentiment.",
  },
  {
    agent: "quant-expert",
    thinkingLabel: "Quant Expert is checking the data one more time...",
    instruction:
      "Final word. Based on the discussion, stand your ground, concede specific points, or solidify the agreed-upon strategy. Be clear about the final risk assessment.",
  },
];

export const orchestratorConfig = {
  debateRounds,
} as const;
