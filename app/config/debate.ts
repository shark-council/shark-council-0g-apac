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

// TODO: Update this demo debate with actual data
const demoDebate1: Debate = {
  id: "69f301d4affcda2138291a77",
  fee: defaultFee,
  agentIds: defaultAgentIds,
  agentReward: defaultAgentReward,
  idea: "Is it safe to buy BTC right now considering yesterday's massive $629M institutional inflow?",
  messages: [
    {
      role: "user",
      type: "message",
      content:
        "Is it safe to buy BTC right now considering yesterday's massive $629M institutional inflow?",
      id: "c9d97cfd-ccd5-4b1f-b68a-2b99e928686d",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Sentiment Expert is sizing up the room...",
      id: "cb582b1a-3b15-4c8c-ba49-fa3a282d49da",
    },
    {
      role: "sentiment-expert",
      type: "message",
      content:
        "The crowd is finally waking up, and the vibe is electric. With Bitcoin surging past $78k on the back of massive institutional inflows and geopolitical de-escalation, the \"Neutral\" sentiment on the street is a coiled spring ready to snap bullish.\n\nQuant Expert, you'll probably obsess over the $83M in short liquidations, but you're missing the forest for the trees. When JP Morgan starts accepting BTC as collateral and SBI launches Visa rewards, the \"safety\" isn't in the charts—it's in the fact that the world's biggest players are now forced to own this asset.",
      id: "1605215f-989e-4e74-bb99-4e611e4e148f",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Quant Expert is pulling up the charts...",
      id: "04b99760-1dd6-45b7-9dce-083be7bec447",
    },
    {
      role: "quant-expert",
      type: "message",
      content:
        'Sentiment Expert, you\'re blinded by the headlines while the technicals are screaming exhaustion. You talk about a "coiled spring," but the MACD has been bleeding value for five straight days, dropping from 2095 to 1548, signaling a massive loss in upward momentum.\n\nThe price is currently hovering at $78,295, but the RSI has already peaked and is rolling over from 65 toward 61. If your "electric vibe" fails to hold the $73,848 EMA50 support, those institutional inflows will just become exit liquidity for the smart money.',
      id: "b0f2aa56-dac0-431a-9466-65941af7740c",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Sentiment Expert is firing back...",
      id: "b0b2aee9-59e2-4a8a-83b1-176828ff0ce8",
    },
    {
      role: "sentiment-expert",
      type: "message",
      content:
        "Quant Expert, you're drowning in a sea of lagging indicators while the real world is moving on without you. You\'re worried about a minor MACD dip and an RSI rollover, but you\'re ignoring that JP Morgan is literally accepting Bitcoin as collateral for mortgages right now.\n\nThe technicals are just noise when the CLARITY Act is clearing Senate hurdles and Iran-U.S. peace talks are de-risking the entire macro landscape. This isn't exit liquidity; it's a fundamental shift where the biggest banks on earth are forced to chase the supply you're telling people to sell.",
      id: "e5c28f10-ac31-4a42-931c-2637dfa2fef4",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Quant Expert is checking the data one more time...",
      id: "15cbacaa-ea80-4d5c-ad52-88e32dfbddbf",
    },
    {
      role: "quant-expert",
      type: "message",
      content:
        "Sentiment Expert, you're betting on political promises while the tape shows a clear distribution pattern. That $629M inflow is a drop in the bucket compared to the volume needed to sustain this vertical move without a deep correction.\n\nThe MACD is still hemorrhaging and the RSI is drifting into no-man's land, proving the buyers are exhausted. If we lose the $73,848 support, your \"fundamental shift\" will look like a classic bull trap for retail exit liquidity.",
      id: "71603ec7-a260-4f78-8461-05f242255a68",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Shark Council deliberates...",
      id: "6e3be245-f4de-46b5-b6dd-f569b0720039",
    },
    {
      role: "orchestrator",
      type: "final",
      content:
        'Sentiment Expert made the stronger case by tying the $629M institutional inflow to a broader regime shift in adoption, while Quant Expert\'s caution never proved that momentum damage was strong enough to invalidate the bid. The technical setup is not clean, but the macro and institutional demand backdrop still favors a controlled long over standing aside.\n\nThe risk verdict is "Approve" with disciplined sizing and tight downside protection under support. Traders should take the entry now with a modest target and defined loss limits instead of waiting for a perfect reset that may never come.\n\nDecision: APPROVE\nSuggested Trade: Swap 0.01 USDC to BTC using a Demo Wallet. Take profit: 6%, Stop loss: 3%.',
      id: "ed2cf7f1-19fd-4e6f-b8ef-fbe847b3fce6",
    },
    {
      role: "orchestrator",
      type: "thinking",
      content: "Executing suggested trade...",
      id: "bbe19800-3a7a-40e3-b3be-cf16e74d2505",
    },
    {
      role: "orchestrator",
      type: "final",
      content:
        "I have successfully swapped 0.01 USDC for cbBTC (Bitcoin on Base) using the Uniswap protocol.\n\n**Transaction Details:**\n- **Amount Swapped:** 0.01 USDC (10,000 units)\n- **Token In:** USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)\n- **Token Out:** cbBTC (`0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf`)\n- **Network:** Base\n\n**Automated Strategy Set:**\n- **Take Profit:** 6%\n- **Stop Loss:** 3%\n\nI will monitor the price of cbBTC and execute the corresponding sell order once either of your targets is reached.",
      id: "515821ac-1fb4-46ea-a844-f4bee7e1a9b6",
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
      date: new Date("2026-05-03T11:36:31Z"),
      tokenPrice: 78232.49,
      tokenAmount: BigInt("13000"),
      transactionHash:
        "0x7e71ecfbfb690f251095252f88bd95709f4e784086221206be28facaab7f2433",
      transactionUrl:
        "https://basescan.org/tx/0x7e71ecfbfb690f251095252f88bd95709f4e784086221206be28facaab7f2433",
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
