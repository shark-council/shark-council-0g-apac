import { DebateChat } from "@/components/debates/debate-chat";
import { DebateDetails } from "@/components/debates/debate-details";
import { ScrollArea } from "@/components/ui/scroll-area";
import { debateConfig } from "@/config/debate";

export default async function DebatePage({
  params,
  searchParams,
}: {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{
    idea?: string | string[];
    agent?: string | string[];
  }>;
}) {
  const { id } = await params;
  const { idea, agent } = await searchParams;

  let debate = debateConfig.demoDebates.find((debate) => debate.id === id);
  if (!debate) {
    const debateFee = debateConfig.defaultFee;
    const debateAgentReward = debateConfig.defaultAgentReward;
    const debateIdea = Array.isArray(idea) ? (idea[0] ?? "") : (idea ?? "");
    const debateAgentIds = Array.isArray(agent)
      ? agent
      : typeof agent === "string"
        ? [agent]
        : debateConfig.defaultAgentIds;

    debate = {
      id: id,
      fee: debateFee,
      idea: debateIdea,
      agentIds: debateAgentIds,
      agentReward: debateAgentReward,
      messages: [],
    };
  }

  return (
    <main className="flex flex-1 flex-row items-start gap-4 px-4 py-4">
      <ScrollArea className="flex-3 h-[calc(100dvh-4rem-2rem-1rem)]">
        <DebateChat key={debate.id} debate={debate} />
      </ScrollArea>
      <ScrollArea className="flex-2 h-[calc(100dvh-4rem-2rem-1rem)]">
        <DebateDetails debate={debate} />
      </ScrollArea>
    </main>
  );
}
