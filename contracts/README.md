# 🦈 Shark Council (0G APAC) - Contracts

This is a Hardhat project for Shark Council.

## 🧱 Stack

- **Hardhat 3 Beta**: Ethereum development environment.
- **Solidity**: Object-oriented programming language for smart contracts.
- **TypeScript**: Type-safe development environment.
- **viem**: TypeScript interface for Ethereum.
- **node:test**: Node.js native test runner.
- **0G Chain**: EVM-compatible blockchain where smart contracts are deployed to manage agent identities, reputations, and rewards.
- **0G ERC-7857**: Token standard used to represent agents as non-fungible tokens, defining their on-chain identity and metadata.

## 📂 Structure

- `contracts/` - Solidity smart contracts (including ERC-7857 implementation) and interfaces.
- `ignition/` - Hardhat Ignition deployment modules for declarative contract deployments.
- `scripts/` - Utility scripts for configuration, executing specific transactions, and custom deployments.
- `test/` - Node.js and Solidity-based tests to verify contract behavior and logic.

## ℹ️ Instructions

- To learn more about the Hardhat 3 Beta, please visit the [Getting Started guide](https://hardhat.org/docs/getting-started#getting-started-with-hardhat-3).

## ⌨️ Commands

- Install dependencies - `npm install`
- Run all tests - `npx hardhat test`
- Run Solidity tests - `npx hardhat test solidity`
- Run `node:test` tests - `npx hardhat test nodejs`
- Deploy to local chain - `npx hardhat ignition deploy ignition/modules/Counter.ts`
- Deploy to Sepolia - `npx hardhat ignition deploy --network sepolia ignition/modules/Counter.ts`
- Verify - `npx hardhat verify 0x0000000000000000000000000000000000000000 [constructorArgs] --network sepolia`
- Run a script - `npx hardhat run scripts/script.ts --network sepolia`
- Set `SEPOLIA_PRIVATE_KEY` with keystore - `npx hardhat keystore set SEPOLIA_PRIVATE_KEY`

## 📄 Template for .env file

```shell
0G_TESTNET_RPC_URL=""
0G_TESTNET_PRIVATE_KEY=""

0G_MAINNET_RPC_URL=""
0G_MAINNET_PRIVATE_KEY=""

ETHERSCAN_API_KEY=""
```
