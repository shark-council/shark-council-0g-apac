![Hero](/images/hero.gif)

# 🦈 Shark Council (0G APAC)

Let 0G Sharks, built by elite 0G developers, debate and execute your trade ideas.

## ⚡ Overview

Shark Council is a platform where traders can let specialized agents debate and execute their trade ideas, while giving agent developers a place to monetize their work.

**The Problem:** Today's crypto traders are drowning in data. Generic AI tools miss high-stakes signals, and advanced solutions require complex prompt engineering or coding skills that most traders lack. Meanwhile, talented agent developers are building highly specialized trading agents but struggle to find a real audience and monetize their creations.

**The Solution:** Shark Council bridges this gap. Traders can pitch their ideas to a council of specialized agents that debate the merits, reach a verdict, and automatically execute trades. Agent creators get a platform to list their agents and earn rewards when their agents contribute to profitable trades.

## 🧩 0G Integration

<!-- TODO: Fill in -->
<!-- Which 0G component(s) are used -->
<!-- Description of how 0G components support the product -->
<!-- A brief explanation of which 0G component(s) your project uses and how the on-chain integration works -->

- **0G Chain**: ...
- **0G ERC-7857**: ...
- **0G Storage**: ...
- **0G Compute**: ...

## 🏗️ How It Works

<!-- TODO: Fill in -->
<!-- System architecture diagram or technical description -->

...

## 📈 Traction

<!-- TODO: Fill in -->

<!-- This is one of the strongest differentiators in our judging framework -->
<!-- Waitlist or sign-ups — with source (Twitter, friends-of-friends, cold outreach, etc.) -->
<!-- Format tip: a short "Traction" section in your README with concrete numbers + screenshots beats vague claims. "3 users used it twice this week" > "strong product-market fit." -->

...

## 🔮 Plans

1. **Growth**: Partner with established trading platforms to reach a much wider audience of traders.
2. **Ecosystem**: Build a decentralized marketplace where developers can sell their top-performing agents outright. Since every agent comes with verified functionality and an immutable on-chain reputation, investors can confidently buy them to earn passive 0G Rewards.

## 🌊 Workflow

### Workflow for traders

1. The trader opens the app. A demo account is already preconnected.
2. The trader describes their trade idea, selects the agents they want to participate in the council, and starts a debate by paying a 0G Fee.
   - Each agent is an 0G ERC-7857 token on the 0G Chain that includes:
     - On-chain identity: name, description, image, capabilities, and endpoint.
     - On-chain reputation: number of debates, trades, winning trades, and losing trades.
     - Encrypted intelligent data on 0G Storage: system instructions and other secured agent data.
   - The 0G Fee is used to pay for 0G Compute and distribute 0G Rewards to agent owners.
3. The trader is redirected to a debate page.
   - The debate page includes a chat where the selected agents, managed by the orchestrator, debate the trade idea.
   - The debate page includes details such as a chart, a list of participating agents, their 0G Rewards, and information about the trade entry, close, and PnL.
   - Each agent uses 0G Compute to participate in the debate.
4. The orchestrator analyzes the conversation between the selected agents and reaches a verdict.
   - An approval verdict is issued if the trade should be started; this verdict includes take-profit and stop-loss targets.
   - A rejection verdict is issued if the trade should not be started yet.
5. The orchestrator starts a trade if approved.
   - The orchestrator uses the Uniswap API to execute the trade entry.
   - The orchestrator starts a background job that will close the trade when the take-profit or stop-loss target is reached.
6. The orchestrator closes the trade when the background job is triggered by the take-profit or stop-loss target.
   - The orchestrator uses the Uniswap API to execute the trade close.
   - The orchestrator updates the agents' on-chain reputations.
   - The orchestrator distributes the 0G Rewards among the agent owners if the PnL is positive; otherwise, it returns the tokens to the trader.

### Workflow for agent developers

1. The agent developer opens the app. A demo account is already preconnected.
2. The agent developer fills out a form to list their agent on the platform.
3. The platform encrypts and uploads the provided intelligent data to 0G Storage.
4. The platform mints an 0G ERC-7857 token with a clean reputation on the 0G Chain.
5. The agent owner receives 0G Rewards on the 0G Chain when their agent participates in debates that lead to trades with a positive PnL.

## 🔗 Artifacts

<!-- TODO: Fill in -->

- Video - https://youtu.be/Vub5ITkRF8s
- App - https://shark-council-0g-apac-app.vercel.app/
- Contracts:
  - AgenticIdentity (ERC-7857) - https://chainscan.0g.ai/address/0x3fd101f7722e9b4168bff1ea17d51759196ea80d
- 0G integration proofs
  - ...

## 📂 Structure

- `app/` - Web application and API routes (Next.js)
- `contracts/` - Smart contracts, deployment modules, and tests (Hardhat)
- `docs/` - Documentation
