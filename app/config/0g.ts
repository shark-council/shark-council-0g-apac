/* eslint-disable @typescript-eslint/no-unused-vars */

import { Chain, defineChain } from "viem";

type zerogConfig = {
  chain: Chain;
  addresses: {
    agenticIdentity: `0x${string}`;
    feeManager: `0x${string}`;
  };
  compute: {
    model: string;
    baseUrl: string;
    testnet: boolean;
  };
  storage: {
    rpcUrl: string;
    indexerRpc: string;
    testnet: boolean;
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
  addresses: {
    agenticIdentity: "0xad946b989a831eea0bb8d9c62b7ef34487996fdb",
    feeManager: "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1",
  },
  compute: {
    model: "qwen/qwen-2.5-7b-instruct",
    baseUrl: "https://router-api-testnet.integratenetwork.work/v1",
    testnet: true,
  },
  storage: {
    rpcUrl: "https://evmrpc-testnet.0g.ai",
    indexerRpc: "https://indexer-storage-testnet-turbo.0g.ai",
    testnet: true,
  },
};

const zerogConfigMainnet: zerogConfig = {
  chain: zerogMainnet,
  addresses: {
    agenticIdentity: "0x3fd101f7722e9b4168bff1ea17d51759196ea80d",
    feeManager: "0x4306D7a79265D2cb85Db0c5a55ea5F4f6F73C4B1",
  },
  compute: {
    model: "qwen/qwen3-vl-30b-a3b-instruct",
    baseUrl: "https://router-api.0g.ai/v1",
    testnet: false,
  },
  storage: {
    rpcUrl: "https://evmrpc.0g.ai",
    indexerRpc: "https://indexer-storage-turbo.0g.ai",
    testnet: false,
  },
};

export const zerogConfig = zerogConfigMainnet;
