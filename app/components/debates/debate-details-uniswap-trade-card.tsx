import { formatHash } from "@/lib/utils";
import { Debate } from "@/types/debate";
import { ClassValue } from "clsx";
import { RefreshCcw } from "lucide-react";
import Link from "next/link";
import { formatUnits } from "viem";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Spinner } from "../ui/spinner";

export function DebateDetailsUniswapTradeCard(props: {
  debate: Debate;
  className?: ClassValue;
}) {
  if (!props.debate.uniswapTrade) {
    return null;
  }

  return (
    <Card className="border border-primary/40 bg-primary/5">
      <CardHeader className="border-b">
        <CardTitle>
          <RefreshCcw className="size-4 mb-1 mr-1 inline" /> Uniswap trade
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Meta */}
        <div className="flex flex-col gap-2">
          {/* Chain */}
          <div className="flex flex-row gap-2">
            <p className="text-muted-foreground">Chain:</p>
            <p>{props.debate.uniswapTrade.chainName}</p>
          </div>
          {/* Token */}
          <div className="flex flex-row items-center gap-2">
            <p className="text-muted-foreground">Token:</p>
            <Button variant="link" className="h-auto p-0" asChild>
              <Link href={props.debate.uniswapTrade.tokenUrl} target="_blank">
                {props.debate.uniswapTrade.tokenSymbol}
              </Link>
            </Button>
          </div>
          {/* Status */}
          <div className="flex flex-row gap-2">
            <p className="text-muted-foreground">Status:</p>
            <p>{props.debate.uniswapTrade.status}</p>
          </div>
        </div>
        {/* Entry */}
        <p className="font-bold mt-6">Entry</p>
        {props.debate.uniswapTrade.entry ? (
          <div className="flex flex-col gap-2 mt-2">
            {/* Date */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Date:</p>
              <p>{props.debate.uniswapTrade.entry.date.toLocaleString()}</p>
            </div>
            {/* Token price */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Price ($):</p>
              <p>{props.debate.uniswapTrade.entry?.tokenPrice}</p>
            </div>
            {/* Token amount */}
            <div className="flex flex-row gap-2">
              <p className="text-muted-foreground">Amount:</p>
              <p>
                {formatUnits(
                  BigInt(props.debate.uniswapTrade.entry.tokenAmount),
                  props.debate.uniswapTrade.tokenDecimals,
                )}
              </p>
            </div>
            {/* Transaction */}
            <div className="flex flex-row items-center gap-2">
              <p className="text-muted-foreground">Transaction:</p>
              <Button variant="link" className="h-auto p-0" asChild>
                <Link
                  href={props.debate.uniswapTrade.entry.transactionUrl}
                  target="_blank"
                >
                  {formatHash(props.debate.uniswapTrade.entry.transactionHash)}
                </Link>
              </Button>
            </div>
          </div>
        ) : (
          <p className="text-muted-foreground mt-4">NA</p>
        )}
        {/* Exit */}
        <p className="font-bold mt-6">Exit</p>
        {props.debate.uniswapTrade.exit ? (
          <Spinner className="mt-2" />
        ) : (
          <p className="text-muted-foreground mt-2">NA</p>
        )}
        {/* PnL */}
        <p className="font-bold mt-6">PnL</p>
        {props.debate.uniswapTrade.pnlPercentage ? (
          <Spinner className="mt-2" />
        ) : (
          <p className="text-muted-foreground mt-2">NA</p>
        )}
      </CardContent>
    </Card>
  );
}
