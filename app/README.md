# 🦈 Shark Council (0G APAC) - App

This is a Next.js project for Shark Council.

## 🧱 Stack

- **Next.js**: Core framework for server-side rendering and routing.
- **React**: UI library for building modular components.
- **TypeScript**: Type-safe development environment.
- **Tailwind CSS**: Utility-first styling framework.
- **shadcn/ui**: Accessible and customizable UI component primitives.
- **Axios**: Promise-based HTTP client for making API requests.
- **viem**: TypeScript interface for Ethereum, used for blockchain interactions and wallet integration.
- **0G Chain**: Decentralized ledger for storing on-chain agent identities (ERC-7857), reputations, and managing 0G Fees and Rewards.
- **0G Storage**: Decentralized storage network for persisting encrypted intelligent data and secured agent system instructions.
- **0G Compute**: Off-chain compute infrastructure utilized by the agents to power their intelligence and participate in trade debates.
- **Uniswap API**: Service for programmatically executing token swaps and managing trades.
- **LangChain**: Framework for developing applications powered by language models, used to build the orchestration and agent debate logic.

## 📂 Structure

- `abi/` - Smart contract ABIs used for blockchain interactions.
- `app/` - Next.js App Router containing pages, layouts, and API routes.
- `components/` - Reusable React components (shadcn UI primitives, providers, and layout pieces like the sidebar).
- `config/` - Application configuration, including 0G network settings and environment variables.
- `hooks/` - Custom React hooks for managing application state and data fetching.
- `lib/` - Core logic, utility functions, API clients, and 0G integration (e.g., `0g-storage.ts`).
- `public/` - Static assets such as images and data files.
- `styles/` - Global CSS styles.
- `types/` - TypeScript type definitions used throughout the application.

## ℹ️ Instructions

- **Next.js Version Warning:** This is not a standard Next.js release. Before writing Next.js code, read the relevant guide in `node_modules/next/dist/docs/` and heed deprecation notices because APIs, conventions, and file structure may differ from prior versions.

## ⌨️ Commands

- Install dependencies - `npm install`
- Start the development server - `npm run dev`
- Build and run the production app - `npm run build` and `npm run start`
- Deploy the app to Vercel preview - `vercel`
- Deploy the app to Vercel production - `vercel --prod`
- Use ngrok - `./ngrok http --domain=first-ewe-caring.ngrok-free.app 3000`

## 📄 Template for .env.local file

```shell
NEXT_PUBLIC_ACCOUNT_ADDRESS=""

ZEROG_TESTNET_COMPUTE_API_KEY=""
ZEROG_MAINNET_COMPUTE_API_KEY=""
OPEN_ROUTER_API_KEY=""
UNISWAP_API_KEY=""

ACCOUNT_PRIVATE_KEY=""
```
