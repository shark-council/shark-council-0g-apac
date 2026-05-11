import { zeroAddress } from "viem";

// TODO: Replace with actual data
export const accountConfig = {
  walletAddress: zeroAddress,
  baseBlockchainExplorer: `https://basescan.org/address/${zeroAddress}`,
  "0gTestnetBlockchainExplorer": `https://chainscan-galileo.0g.ai/address/${zeroAddress}`,
} as const;
