import { agenticIdentityAbi } from "@/abi/agentic-identity";
import { zerogConfig } from "@/config/0g";
import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";
import {
  createWalletClient,
  http,
  keccak256,
  parseEventLogs,
  publicActions,
  toHex,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
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

    // Define wallet client
    const accountPrivateKey = process.env.ACCOUNT_PRIVATE_KEY as `0x${string}`;
    const account = privateKeyToAccount(accountPrivateKey);
    const walletClient = createWalletClient({
      account,
      chain: zerogConfig.chain,
      transport: http(zerogConfig.storage.rpcUrl),
    }).extend(publicActions);

    // Get mint fee
    const mintFee = await walletClient.readContract({
      address: zerogConfig.contracts.agenticIdentity,
      abi: agenticIdentityAbi,
      functionName: "mintFee",
    });

    // Prepare data for minting
    const datas = [
      {
        dataDescription: "intelligent_data",
        dataHash: keccak256(toHex(bodyParseResult.data.intelligentData)),
      },
    ];

    // Mint agentic identity
    const { request: iMintRequest } = await walletClient.simulateContract({
      address: zerogConfig.contracts.agenticIdentity,
      abi: agenticIdentityAbi,
      functionName: "iMint",
      args: [account.address, datas],
      value: mintFee,
      account,
    });
    const iMintTxHash = await walletClient.writeContract(iMintRequest);
    console.log(`[Agent Listing API] iMint transaction hash: ${iMintTxHash}`);
    const receipt = await walletClient.waitForTransactionReceipt({
      hash: iMintTxHash,
    });
    console.log("[Agent Listing API] iMint transaction confirmed");

    // Extract tokenId from Transfer event
    const logs = parseEventLogs({
      abi: agenticIdentityAbi,
      logs: receipt.logs,
      eventName: "Transfer",
    });
    const tokenId = logs[0]?.args?.tokenId;
    if (tokenId === undefined) {
      throw new Error("tokenId not found in transaction logs");
    }
    console.log(`[Agent Listing API] Extracted tokenId: ${tokenId}`);

    // Prepare data to set Token URI
    const metadata = {
      name: bodyParseResult.data.name,
      description: bodyParseResult.data.description,
      image: bodyParseResult.data.image,
      capabilities: bodyParseResult.data.capabilities,
      endpoint: bodyParseResult.data.endpoint,
    };
    const metadataBase64 = Buffer.from(JSON.stringify(metadata)).toString(
      "base64",
    );
    const tokenURI = `data:application/json;base64,${metadataBase64}`;

    // Set token URI
    const { request: setTokenURIRequest } = await walletClient.simulateContract(
      {
        address: zerogConfig.contracts.agenticIdentity,
        abi: agenticIdentityAbi,
        functionName: "setTokenURI",
        args: [tokenId, tokenURI],
        account,
      },
    );
    const setTokenURITxHash =
      await walletClient.writeContract(setTokenURIRequest);
    console.log(
      `[Agent Listing API] setTokenURI transaction hash: ${setTokenURITxHash}`,
    );
    await walletClient.waitForTransactionReceipt({
      hash: setTokenURITxHash,
    });
    console.log("[Agent Listing API] setTokenURI transaction confirmed");

    return createSuccessApiResponse({
      tokenId: tokenId.toString(),
      iMintTxHash: "",
      setTokenURITxHash: setTokenURITxHash,
    });
  } catch (error) {
    console.error("[Agents Listing API] Failed to handle post request,", error);
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
