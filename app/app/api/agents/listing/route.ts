import { agenticIdentityAbi } from "@/abi/agentic-identity";
import { zerogConfig } from "@/config/0g";
import { uploadTextTo0gStorage } from "@/lib/0g-storage";
import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { NextRequest } from "next/server";
import { createWalletClient, http, parseEventLogs, publicActions } from "viem";
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
      transport: http(zerogConfig.chain.rpcUrls.default.http[0]),
    }).extend(publicActions);

    // Get mint fee
    const mintFee = await walletClient.readContract({
      address: zerogConfig.contracts.agenticIdentity,
      abi: agenticIdentityAbi,
      functionName: "mintFee",
    });

    const { uploadTx } = await uploadTextTo0gStorage(body.intelligentData);

    const datas: {
      dataDescription: string;
      dataHash: `0x${string}`;
    }[] = [];
    if ("txHash" in uploadTx && "rootHash" in uploadTx) {
      datas.push({
        dataDescription: "0g_storage_root_hash",
        dataHash: uploadTx.rootHash as `0x${string}`,
      });
      datas.push({
        dataDescription: "0g_storage_tx_hash",
        dataHash: uploadTx.txHash as `0x${string}`,
      });
    }

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
      retryCount: 120,
      retryDelay: 1000,
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
      retryCount: 120,
      retryDelay: 1000,
    });
    console.log("[Agent Listing API] setTokenURI transaction confirmed");

    return createSuccessApiResponse({
      tokenId: tokenId.toString(),
      iMintTxHash: iMintTxHash,
      setTokenURITxHash: setTokenURITxHash,
    });
  } catch (error) {
    console.error("[Agents Listing API] Failed to handle post request,", error);
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
