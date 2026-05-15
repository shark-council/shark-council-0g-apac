import { agenticIdentityAbi } from "@/abi/agentic-identity";
import { zerogConfig } from "@/config/0g";
import { agentConfig } from "@/config/agent";
import { Agent, AgentIdentity, AgentReputation } from "@/types/agent";
import { useQuery } from "@tanstack/react-query";
import { createPublicClient, http } from "viem";

async function fetchAgents(): Promise<Agent[]> {
  const publicClient = createPublicClient({
    chain: zerogConfig.chain,
    transport: http(zerogConfig.chain.rpcUrls.default.http[0]),
  });

  const contractAddress = zerogConfig.contracts.agenticIdentity;

  // 1. Get total supply
  const totalSupply = await publicClient.readContract({
    address: contractAddress,
    abi: agenticIdentityAbi,
    functionName: "totalSupply",
  });

  const agents: Agent[] = [];

  // 2. Fetch each token's data
  for (let i = 0; i < Number(totalSupply); i++) {
    try {
      const tokenId = await publicClient.readContract({
        address: contractAddress,
        abi: agenticIdentityAbi,
        functionName: "tokenByIndex",
        args: [BigInt(i)],
      });

      if (agentConfig.hiddenIds.includes(tokenId)) {
        continue;
      }

      const [uri, reputation] = await Promise.all([
        publicClient.readContract({
          address: contractAddress,
          abi: agenticIdentityAbi,
          functionName: "tokenURI",
          args: [tokenId],
        }),
        publicClient.readContract({
          address: contractAddress,
          abi: agenticIdentityAbi,
          functionName: "getReputation",
          args: [tokenId],
        }),
      ]);

      // 3. Decode Token URI (Base64 JSON)
      let identity: AgentIdentity = {
        name: `Agent #${tokenId}`,
        description: "",
        image: "",
        capabilities: [],
        endpoint: "",
      };

      if (uri.startsWith("data:application/json;base64,")) {
        const base64 = uri.replace("data:application/json;base64,", "");
        const json = atob(base64);
        identity = JSON.parse(json);
      }

      // 4. Map Reputation
      const agentReputation: AgentReputation = {
        debates: Number(reputation.debates),
        totalTrades: Number(reputation.totalTrades),
        closedTrades: Number(reputation.closedTrades),
        winningTrades: Number(reputation.winningTrades),
        losingTrades: Number(reputation.losingTrades),
      };

      agents.push({
        id: tokenId.toString(),
        identity,
        reputation: agentReputation,
      });
    } catch (error) {
      console.error(
        `[Use Agents Hook] Failed to  fetch agent at index ${i},`,
        error,
      );
    }
  }

  return agents;
}

export function useAgents() {
  return useQuery({
    queryKey: ["agents"],
    queryFn: fetchAgents,
  });
}
