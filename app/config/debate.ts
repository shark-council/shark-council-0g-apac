import { Debate, DebateAgentReward, DebateFee } from "@/types/debate";
import { zerogConfig } from "./0g";

const defaultFee: DebateFee = {
  chainName: zerogConfig.chain.name,
  tokenSymbol: zerogConfig.chain.nativeCurrency.symbol,
  tokenDecimals: zerogConfig.chain.nativeCurrency.decimals,
  tokenAmount: BigInt("100000000000000000"),
};

const defaultAgentIds = ["0", "1"];

const defaultAgentReward: DebateAgentReward = {
  chainName: zerogConfig.chain.name,
  tokenSymbol: zerogConfig.chain.nativeCurrency.symbol,
  tokenDecimals: zerogConfig.chain.nativeCurrency.decimals,
  tokenAmount: BigInt("70000000000000000"),
};

const demoDebate1: Debate = {
  id: "6a06d1f5bd4731c384bce2cb",
  fee: defaultFee,
  agentIds: defaultAgentIds,
  agentReward: defaultAgentReward,
  idea: "Should I long $BTC to front-run the massive $3.5B short liquidation cluster at 83,000?",
  messages: [
    {
      id: "8c4f56f5-624e-4df1-86fb-7d63f84cbd85",
      role: "user",
      type: "message",
      content:
        "Should I long $BTC to front-run the massive $3.5B short liquidation cluster at 83,000?",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Sentiment Expert is sizing up the room...",
      id: "d88d46a9-3017-4e0f-b3d1-d64a4c8c331f",
    },
    {
      role: "sentiment-expert",
      type: "message",
      content:
        "The market is cautiously optimistic, driven by regulatory progress and a shift towards DeFi tokens. However, the overall sentiment remains neutral, with a slight bullish bias from social media discussions. The buzz around the CLARITY Act is significant, as it's reducing regulatory uncertainty and boosting institutional confidence. But, we must also consider the high Bitcoin dominance and the cooling off of altcoin seasons, indicating a cautious approach among retail investors.\n\nNotably, Bitcoin itself is up 0.99% today, primarily due to a stabilization in institutional sentiment following heavy ETF outflows earlier in the week. The latest news includes the Clarity Act clearing the Senate, JPMorgan naming Bitcoin a winner, and Dartmouth investing in crypto ETFs, all signaling a potential shift towards institutional adoption. Yet, the market is still watching closely, as a break below its 200-day SMA could trigger significant long liquidations. The crowd seems to be bullish on the narrative, but the price action and technical indicators suggest a cautious stance, waiting for further confirmation.",
      id: "a15e1691-d83f-4067-9977-ecc184f13fb3",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Quant Expert is pulling up the charts...",
      id: "fc2fdd86-c392-4f8b-94dc-31cf0267809f",
    },
    {
      role: "quant-expert",
      type: "message",
      content:
        "The recent price action shows BTC has been consolidating in a range between 78,000 and 82,000, with today's close at 80,854.52. The RSI at 59.94 indicates a neutral to slightly overbought condition, which is consistent with the market's cautious optimism. However, the MACD values are still positive but declining, suggesting momentum is waning. Given these signals, there's no strong evidence for a front-run on a large short liquidation at 83,000. The market is digesting the latest positive news but remains cautious, as seen in the close proximity to support levels and the decline in MACD values.\n\nThe EMA50 is currently below the price, which could act as a potential resistance level if the bulls push for an upward move. This implies that while there's some bullish sentiment, the bears are still in control, and any attempt to front-run a short liquidation might face significant resistance. Retail investors are indeed cautious, and the market is carefully watching for further confirmation, as indicated by the price staying near key support levels.",
      id: "e1848c8a-639d-4366-9e9d-6784e727473d",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Sentiment Expert is firing back...",
      id: "3fdcf6f3-d860-4824-a288-cd455fe1c0da",
    },
    {
      role: "sentiment-expert",
      type: "message",
      content:
        "The recent uptick in Bitcoin's price is driven by regulatory progress and institutional confidence, with the CLARITY Act clearing the Senate Banking Committee. This is a significant de-risking event, reducing uncertainty and boosting the narrative for institutional adoption. Despite the neutral to slightly overbought condition as indicated by the RSI, the market's momentum is largely positive, with the S&P 500 showing a strong correlation. However, the Quant Expert's technical analysis is overlooking the fundamental shift in institutional sentiment and the potential for a narrative-driven rally. The bullish chatter on social media and the positive impact of JPMorgan's endorsement and Dartmouth's investment in crypto ETFs are powerful indicators of a narrative that is gaining traction, even if the price action is currently cautious. The market's optimism needs to be confirmed by sustained ETF inflows and further regulatory clarity, which could drive a more pronounced upward move. The Quant Expert's focus on technical indicators like the MACD and EMA50 is important, but it doesn't capture the broader psychological shift and the potential for a front-run on the upcoming short liquidation cluster.",
      id: "11f423ab-f7c4-471f-aba6-6ebda8293a43",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Quant Expert is checking the data one more time...",
      id: "61b5637c-a828-4a28-b380-1c0f582e710e",
    },
    {
      role: "quant-expert",
      type: "message",
      content:
        "Based on the recent daily snapshot, BTC closed at $80,854.52, slightly above its current EMA50 value of $76,533.91, indicating that the price is near a potential resistance level. The RSI14 is at 59.94, suggesting a neutral to slightly overbought condition. While this does align with the market's cautious optimism, the decline in MACD values from recent highs indicates waning momentum.\n\nThe EMA50 crossing below the price suggests that the bears may still have control, especially if the bulls attempt to push for an upward move. Given the current price action and the fact that a short liquidation cluster of $3.5B is scheduled at $83,000, it would be unwise to front-run such a significant event without strong supportive signals. The market is still digesting positive news but remains cautious, as evidenced by the close proximity to support levels and the declining MACD values. Any attempt to front-run could face substantial resistance from existing bearish positions.",
      id: "78efb249-a712-496b-ab54-ec5cfd84d151",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Shark Council deliberates...",
      id: "5e03269c-8e2d-4697-a5a9-8c0d28fac3c1",
    },
    {
      role: "orchestrator",
      type: "final",
      content:
        'The Sentiment Expert carries this debate by correctly identifying the de-risking power of the CLARITY Act and institutional endorsements, which serve as the primary fuel for hunting high-gravity liquidation clusters. While the Quant Expert notes waning momentum, they fail to account for the fact that large liquidation zones at $83,000 act as a magnet for price, often overriding standard technical oscillators like the RSI or MACD.\n\nThe risk verdict is a tactical "Go" as the fundamental shift in institutional adoption provides the necessary tailwind to squeeze the $3.5B short cluster. Traders should initiate a long position immediately to capture the volatility spike as these shorts are forced to cover.\n\nDecision: APPROVE\nSuggested Trade: Swap 0.1 USDC to BTC using a Demo Wallet. Take profit: 3%, Stop loss: 1.5%.',
      id: "0a34f5ae-fefc-4810-91fb-1dd27e3dcadf",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Processing account management request...",
      id: "633e3408-f66d-4b75-b22e-86ae8622f21f",
    },
    {
      role: "orchestrator",
      type: "final",
      content:
        "I have successfully swapped **0.1 USDC** for **cbBTC** (Bitcoin on Base).\n\n**Transaction Details:**\n- **Network:** Base\n- **Amount Swapped:** 100,000 units (0.1 USDC)\n- **Token In (USDC):** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`\n- **Token Out (cbBTC):** `0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf`\n\n**Position Management:**\n- **Take Profit set at:** 3%\n- **Stop Loss set at:** 1.5%\n\nI will monitor the price movement and execute accordingly once these thresholds are met.",
      id: "cfd75f7c-d356-48d1-b041-a2758e766cdc",
    },
  ],
  uniswapTrade: {
    chainName: "Base",
    tokenSymbol: "cbBTC",
    tokenDecimals: 8,
    tokenAddress: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    tokenUrl:
      "https://basescan.org/token/0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    status: "open",
    dexScreenerData: {
      chainName: "base",
      pairAddress: "0xfbb6eed8e7aa03b138556eedaf5d271a5e1e43ef",
    },
    entry: {
      date: new Date("2026-05-15T07:59:19Z"),
      tokenPrice: 80751.1,
      tokenAmount: BigInt("123"),
      transactionHash:
        "0x7e9925168b2035197cc7e4cb84408bf42c1aa8b2f51ad7a005456f6f5e8894dd",
      transactionUrl:
        "https://basescan.org/tx/0x7e9925168b2035197cc7e4cb84408bf42c1aa8b2f51ad7a005456f6f5e8894dd",
    },
  },
};

const demoDebates: Debate[] = [demoDebate1];

export const debateConfig = {
  defaultFee,
  defaultAgentIds,
  defaultAgentReward,
  demoDebates: demoDebates,
};
