import { defineChain } from "viem";

const zerogTestnet = defineChain({
  id: 16602,
  name: "0G Testnet",
  nativeCurrency: { name: "0G", symbol: "0G", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evmrpc-testnet.0g.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "0G Testnet Scan",
      url: "https://chainscan-galileo.0g.ai",
    },
  },
  testnet: true,
});

export const zerogConfig = {
  chain: zerogTestnet,
  contracts: {
    agenticIdentity: "0xad946b989a831eea0bb8d9c62b7ef34487996fdb",
  },
  compute: {
    model: "qwen/qwen-2.5-7b-instruct",
    baseUrl: "https://router-api-testnet.integratenetwork.work/v1",
  },
  storage: {
    rpcUrl: "https://evmrpc-testnet.0g.ai",
    indexerRpc: "https://indexer-storage-testnet-turbo.0g.ai",
  },
} as const;
