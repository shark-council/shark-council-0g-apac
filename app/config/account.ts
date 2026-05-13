import { zeroAddress } from "viem";

const accountAddress = process.env.NEXT_PUBLIC_ACCOUNT_ADDRESS || zeroAddress;

export const accountConfig = {
  address: accountAddress,
  "0gMainnetBlockchainExplorer": `https://chainscan.0g.ai/address/${accountAddress}`,
  "0gTestnetBlockchainExplorer": `https://chainscan-galileo.0g.ai/address/${accountAddress}`,
  baseBlockchainExplorer: `https://basescan.org/address/${accountAddress}`,
} as const;
