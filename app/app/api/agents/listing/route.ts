import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";
import {
  createWalletClient,
  http,
  publicActions,
  keccak256,
  toHex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { agenticIdentityAbi } from "@/abi/agentic-identity";
import { zerogConfig } from "@/config/0g";
import z from "zod";

export async function POST(request: NextRequest) {
  try {
    console.log("[Agents Listing API] Handling post request...");

    const bodySchema = z.object({
      name: z.string().min(1),
      description: z.string().min(1),
      image: z.url(),
      capabilities: z.array(z.string()).min(1),
      endpoint: z.url(),
      intelligentData: z.string().min(1),
    });

    const body = await request.json();

    const bodyParseResult = bodySchema.safeParse(body);
    if (!bodyParseResult.success) {
      return createFailedApiResponse({ message: "Invalid request body" }, 400);
    }

    console.log(
      "[Agent Listing API] Listing request payload:",
      bodyParseResult.data,
    );

    const datas = [
      {
        dataDescription: "intelligent_data",
        dataHash: keccak256(toHex(bodyParseResult.data.intelligentData)),
      },
    ];

    const accountPrivateKey = process.env.ACCOUNT_PRIVATE_KEY as `0x${string}`;
    const account = privateKeyToAccount(accountPrivateKey);
    const walletClient = createWalletClient({
      account,
      chain: zerogConfig.chain.chain,
      transport: http(zerogConfig.storage.rpcUrl),
    }).extend(publicActions);

    const mintFee = await walletClient.readContract({
      address: zerogConfig.chain.contracts.agenticIdentity,
      abi: agenticIdentityAbi,
      functionName: "mintFee",
    });

    const { request: simulateRequest } = await walletClient.simulateContract({
      address: zerogConfig.chain.contracts.agenticIdentity,
      abi: agenticIdentityAbi,
      functionName: "iMint",
      args: [account.address, datas],
      value: mintFee,
      account,
    });

    const hash = await walletClient.writeContract(simulateRequest);

    console.log(`[Agent Listing API] iMint transaction sent: ${hash}`);

    const receipt = await walletClient.waitForTransactionReceipt({ hash });
    console.log(
      `[Agent Listing API] iMint transaction confirmed in block ${receipt.blockNumber}`,
    );

    return createSuccessApiResponse({ hash });
  } catch (error) {
    console.error("[Agents Listing API] Failed to handle post request,", error);
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
