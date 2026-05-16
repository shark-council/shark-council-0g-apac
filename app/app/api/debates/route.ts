import { zerogConfig } from "@/config/0g";
import { debateConfig } from "@/config/debate";
import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { Debate } from "@/types/debate";
import { ObjectId } from "bson";
import { NextRequest } from "next/server";
import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    console.log("[Debates API] Handling post request...");

    const bodySchema = z.object({
      idea: z.string().min(1),
      agents: z.array(z.string()).min(2),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    // Define public and wallet clients
    const publicClient = createPublicClient({
      chain: zerogConfig.chain,
      transport: http(zerogConfig.chain.rpcUrls.default.http[0]),
    });
    const accountPrivateKey = process.env.ACCOUNT_PRIVATE_KEY as `0x${string}`;
    const account = privateKeyToAccount(accountPrivateKey);
    const walletClient = createWalletClient({
      account,
      chain: zerogConfig.chain,
      transport: http(zerogConfig.chain.rpcUrls.default.http[0]),
    });

    // Send fee
    const txHash = await walletClient.sendTransaction({
      to: zerogConfig.addresses.feeManager,
      value: BigInt(debateConfig.defaultFee.tokenAmount),
    });
    console.log(`[Debates API] Fee transaction sent, hash: ${txHash}`);

    // Wait for fee transaction confirmation
    await publicClient.waitForTransactionReceipt({
      hash: txHash,
    });
    console.log("[Debates API] Fee transaction confirmed");

    const debate: Debate = {
      id: new ObjectId().toHexString(),
      fee: debateConfig.defaultFee,
      agentIds: debateConfig.defaultAgentIds,
      agentReward: debateConfig.defaultAgentReward,
      idea: bodyParseResult.data.idea,
      messages: [],
    };

    return createSuccessApiResponse({ debate });
  } catch (error) {
    console.error("[Debates API] Failed to handle post request,", error);
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
