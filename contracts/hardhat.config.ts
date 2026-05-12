import hardhatToolboxViemPlugin from "@nomicfoundation/hardhat-toolbox-viem";
import "dotenv/config";
import { configVariable, defineConfig } from "hardhat/config";

export default defineConfig({
  plugins: [hardhatToolboxViemPlugin],
  solidity: {
    profiles: {
      default: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
      production: {
        version: "0.8.28",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      },
    },
  },
  chainDescriptors: {
    16602: {
      name: "0gTestnet",
      blockExplorers: {
        etherscan: {
          name: "0G Testnet Scan",
          url: "https://chainscan-galileo.0g.ai",
          apiUrl: "https://chainscan-galileo.0g.ai/open/api",
        },
      },
    },
    16661: {
      name: "0gMainnet",
      blockExplorers: {
        etherscan: {
          name: "0G Mainnet Scan",
          url: "https://chainscan.0g.ai",
          apiUrl: "https://chainscan.0g.ai/open/api",
        },
      },
    },
  },
  networks: {
    hardhatMainnet: {
      type: "edr-simulated",
      chainType: "l1",
    },
    hardhatOp: {
      type: "edr-simulated",
      chainType: "op",
    },
    sepolia: {
      type: "http",
      chainType: "l1",
      url: configVariable("SEPOLIA_RPC_URL"),
      accounts: [configVariable("SEPOLIA_PRIVATE_KEY")],
    },
    "0gTestnet": {
      type: "http",
      chainType: "l1",
      chainId: 16602,
      url: process.env["0G_TESTNET_RPC_URL"] as string,
      accounts: [process.env["0G_TESTNET_PRIVATE_KEY"] as string],
    },
    "0gMainnet": {
      type: "http",
      chainType: "l1",
      chainId: 16661,
      url: process.env["0G_MAINNET_RPC_URL"] as string,
      accounts: [process.env["0G_MAINNET_PRIVATE_KEY"] as string],
    },
  },
  verify: {
    etherscan: {
      apiKey: process.env.ETHERSCAN_API_KEY as string,
    },
    blockscout: { enabled: false },
    sourcify: { enabled: false },
  },
});
