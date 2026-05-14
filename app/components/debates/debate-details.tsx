"use client";

import { cn } from "@/lib/utils";
import { Debate } from "@/types/debate";
import { ClassValue } from "clsx";
import { DebateDetailsAgentsCard } from "./debate-details-agents-card";
import { DebateDetailsChartCard } from "./debate-details-chart-card";
import { DebateDetailsUniswapTradeCard } from "./debate-details-uniswap-trade-card";

export function DebateDetails(props: {
  debate: Debate;
  className?: ClassValue;
}) {
  return (
    <div className={cn("flex flex-col gap-3", props.className)}>
      <DebateDetailsChartCard debate={props.debate} />
      <DebateDetailsAgentsCard debate={props.debate} />
      <DebateDetailsUniswapTradeCard debate={props.debate} />
    </div>
  );
}
