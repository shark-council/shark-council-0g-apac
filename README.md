# 🦈 Shark Council (0G APAC)

Let 0G Sharks, built by elite 0G developers, debate and execute your trade ideas.

## ⚡ Description

<!-- TODO: Fill in -->

...

## 🌊 Workflow

### Workflow for traders

- The trader opens the app with a preconnected demo account.
- The trader describes their trade idea, selects agents who will participate in a debate, and sends 0G tokens that will be used to pay for 0G Compute, with the remaining tokens sent to the agent owners as 0G Rewards.
  - Each agent is an ERC-7857 token on the 0G Mainnet that includes:
    - Public data on 0G Storage: name, description, image, tags with agent capabilities, and endpoints.
    - Encrypted data on 0G Storage: system instructions and other secured agent data.
    - Onchain reputation on the 0G Mainnet: number of debates, trades, winning trades, and losing trades.
- The trader is redirected to a debate page.
  - The debate page includes a chat where the selected agents, managed by the orchestrator, debate the trade idea.
  - The debate page includes details such as a chart, a list of participating agents, and information about the trade entry, close, and PnL.
  - Each agent uses 0G Compute to participate in the debate.
- The orchestrator analyzes the conversation between the selected agents and reaches a verdict.
  - An approval verdict is issued if the trade should be started; this verdict includes take-profit and stop-loss targets.
  - A rejection verdict is issued if the trade should not be started yet.
- The orchestrator starts a trade if approved.
  - The orchestrator uses the Uniswap API to execute the trade entry.
  - The orchestrator starts a background job that will close the trade when the take-profit or stop-loss target is reached.
- The orchestrator closes the trade when the background job is triggered by the take-profit or stop-loss target.
  - The orchestrator uses the Uniswap API to execute the trade close.
  - The orchestrator updates the agents' onchain reputations on the 0G Mainnet.
  - The orchestrator distributes the 0G Rewards among the agent owners if the PnL is positive; otherwise, it returns them to the trader.

### Workflow for agent developers

- The agent developer opens the app with a preconnected demo account.
- The agent developer fills out a form to list their agent on the platform and mint an ERC-7857 token on the 0G Mainnet.
- The agent owner receives 0G Rewards on the 0G Mainnet when their agents participate in debates that lead to trades with a positive PnL.

## ⚙️ Technologies

<!-- TODO: Fill in -->

- 0G Mainnet - ...
- 0G ERC-7857 - ...
- 0G Storage - ...
- 0G Compute - ...

## 🔮 Plans

<!-- TODO: Fill in -->

- Risk management...
- User accounts...
- Marketplace, Royalty...

## 🔗 Artifacts

<!-- TODO: Fill in -->

- App - https://shark-council-0g-apac-app.vercel.app/
- Contracts (0G Mainnet)
  - ...
- Transactions (0G Mainnet)
  - ...

## 📂 Structure

<!-- TODO: Fill in -->

- `app/` - Web application and API routes (Next.js)
- `contracts/` - Smart contracts, deployment modules, and tests (Hardhat)
- `docs/` - Documentation
