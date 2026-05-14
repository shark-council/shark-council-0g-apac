import { base } from "viem/chains";

export const uniswapConfig = {
  apiUrl: "https://trade-api.gateway.uniswap.org/v1",
  chain: base,
  tokens: {
    usdc: {
      symbol: "USDC",
      decimals: 6,
      address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    },
    btc: {
      symbol: "cbBTC",
      decimals: 8,
      address: "0xcbB7C0000aB88B473b1f5aFd9ef808440eed33Bf",
    },
    eth: {
      symbol: "WETH",
      decimals: 18,
      address: "0x4200000000000000000000000000000000000006",
    },
  },
} as const;
