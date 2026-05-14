import { Debate } from "@/types/debate";
import { ClassValue } from "clsx";
import { ChartCandlestickIcon } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export function DebateDetailsChartCard(props: {
  debate: Debate;
  className?: ClassValue;
}) {
  if (!props.debate.uniswapTrade?.dexScreenerData) {
    return null;
  }

  return (
    <Card>
      <CardHeader className="border-b">
        <CardTitle>
          <ChartCandlestickIcon className="size-4 mb-1 mr-1 inline" />
          Chart
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative w-full pb-[125%] min-[1400px]:pb-[65%]">
          <iframe
            className="absolute top-0 left-0 w-full h-full border-0 rounded-xl"
            src={`https://dexscreener.com/${props.debate.uniswapTrade.dexScreenerData.chainName}/${props.debate.uniswapTrade.dexScreenerData.pairAddress}?embed=1&loadChartSettings=0&trades=0&info=0&chartLeftToolbar=0&chartTheme=dark&theme=dark&chartStyle=0&chartType=price&interval=15`}
          ></iframe>
        </div>
      </CardContent>
    </Card>
  );
}
