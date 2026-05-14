import { useAgents } from "@/hooks/use-agents";
import { Debate } from "@/types/debate";
import { ClassValue } from "clsx";
import { BotIcon } from "lucide-react";
import { formatUnits } from "viem";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Separator } from "../ui/separator";
import { Spinner } from "../ui/spinner";

export function DebateDetailsAgentsCard(props: {
  debate: Debate;
  className?: ClassValue;
}) {
  const { data: agents, isLoading } = useAgents();

  return (
    <Card className="border border-accent/40 bg-accent/5">
      <CardHeader className="border-b">
        <CardTitle>
          <BotIcon className="size-4 mb-1 mr-1 inline" />
          0G Sharks
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {isLoading ? (
            <div className="flex items-center gap-2 p-2">
              <Spinner />
              <p className="text-sm text-muted-foreground">Loading...</p>
            </div>
          ) : (
            props.debate.agentIds.map((agentId, index) => {
              const agent = agents?.find((a) => a.id === agentId);

              if (!agent) {
                return <p key={index}>{agentId}</p>;
              }

              return (
                <div className="flex flex-row items-center gap-2" key={index}>
                  <Avatar size="sm">
                    <AvatarImage
                      src={agent.identity.image}
                      alt={agent.identity.name}
                    />
                  </Avatar>
                  <p className="text-sm font-medium">{agent.identity.name}</p>
                </div>
              );
            })
          )}
        </div>
        <div className="flex flex-row gap-2 mt-6">
          <p className="text-muted-foreground">0G Rewards:</p>
          <p>
            {formatUnits(
              props.debate.agentReward.tokenAmount,
              props.debate.agentReward.tokenDecimals,
            )}{" "}
            {props.debate.agentReward.tokenSymbol}
          </p>
          <p className="text-muted-foreground">/</p>
          <p className="text-muted-foreground">
            {formatUnits(
              props.debate.fee.tokenAmount,
              props.debate.fee.tokenDecimals,
            )}{" "}
            {props.debate.fee.tokenSymbol}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
