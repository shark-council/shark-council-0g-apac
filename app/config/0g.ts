/* eslint-disable @typescript-eslint/no-unused-vars */

import { Chain, defineChain } from "viem";

type zerogConfig = {
  chain: Chain;
  contracts: {
    agenticIdentity: `0x${string}`;
  };
  compute: {
    model: string;
    baseUrl: string;
  };
  storage: {
    rpcUrl: string;
    indexerRpc: string;
  };
};

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

const zerogMainnet = defineChain({
  id: 16661,
  name: "0G Mainnet",
  nativeCurrency: { name: "0G", symbol: "0G", decimals: 18 },
  rpcUrls: {
    default: {
      http: ["https://evmrpc.0g.ai"],
    },
  },
  blockExplorers: {
    default: {
      name: "0G Mainnet Scan",
      url: "https://chainscan.0g.ai",
    },
  },
  testnet: false,
});

const zerogConfigTestnet: zerogConfig = {
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
};

const zerogConfigMainnet: zerogConfig = {
  chain: zerogMainnet,
  contracts: {
    agenticIdentity: "0x3fd101f7722e9b4168bff1ea17d51759196ea80d",
  },
  compute: {
    model: "qwen/qwen-2.5-7b-instruct",
    baseUrl: "https://router-api-testnet.integratenetwork.work/v1",
  },
  storage: {
    rpcUrl: "https://evmrpc.0g.ai",
    indexerRpc: "https://indexer-storage-turbo.0g.ai",
  },
};

export const zerogConfig = zerogConfigMainnet;
