import { uniswapConfig } from "@/config/uniswap";
import axios from "axios";
import {
  createPublicClient,
  createWalletClient,
  http,
  isAddress,
  isHex,
  type Address,
} from "viem";
import { getAccount } from "./account";

// Helper to prepare swap request body
function prepareUniswapSwapRequest(
  quoteResponse: Record<string, unknown>,
  signature?: string,
): object {
  const request = { ...quoteResponse };
  const permitData = request.permitData;
  delete request.permitData;
  delete request.permitTransaction;

  const isUniswapX =
    quoteResponse.routing === "DUTCH_V2" ||
    quoteResponse.routing === "DUTCH_V3" ||
    quoteResponse.routing === "PRIORITY";

  if (isUniswapX) {
    if (signature) request.signature = signature;
  } else {
    // CLASSIC: both signature and permitData required together, or both omitted
    if (signature && permitData && typeof permitData === "object") {
      request.signature = signature;
      request.permitData = permitData;
    }
  }

  return request;
}

// Validate swap response before broadcasting
function validateUniswapSwap(swap: {
  data?: string;
  to?: string;
  from?: string;
}): void {
  if (!swap?.data || swap.data === "" || swap.data === "0x") {
    throw new Error("swap.data is empty - quote may have expired");
  }
  if (!isHex(swap.data)) {
    throw new Error("swap.data is not valid hex");
  }
  if (!swap.to || !isAddress(swap.to) || !swap.from || !isAddress(swap.from)) {
    throw new Error("Invalid address in swap response");
  }
}

export async function executeUniswapSwap(
  tokenIn: Address,
  tokenOut: Address,
  amount: string,
): Promise<`0x${string}`> {
  const API_KEY = process.env.UNISWAP_API_KEY;
  const INTEGRATOR_FEE_BIPS = process.env.UNISWAP_INTEGRATOR_FEE_BIPS;
  const INTEGRATOR_FEE_RECIPIENT = process.env.UNISWAP_INTEGRATOR_FEE_RECIPIENT;

  if (!API_KEY) {
    throw new Error("UNISWAP_API_KEY is not set");
  }

  const account = getAccount();
  const publicClient = createPublicClient({
    chain: uniswapConfig.chain,
    transport: http(),
  });
  const walletClient = createWalletClient({
    account,
    chain: uniswapConfig.chain,
    transport: http(),
  });

  const headers = {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
    "x-universal-router-version": "2.0",
  };

  console.log(`[Uniswap] Checking approval for token ${tokenIn}...`);

  // 1. Check approval
  const approvalRes = await axios.post(
    `${uniswapConfig.apiUrl}/check_approval`,
    {
      walletAddress: account.address,
      token: tokenIn,
      amount,
      chainId: uniswapConfig.chain.id,
    },
    { headers },
  );

  const approvalData = approvalRes.data;

  if (approvalData.approval) {
    console.log(`[Uniswap] Executing token approval transaction...`);
    const hash = await walletClient.sendTransaction({
      to: approvalData.approval.to as `0x${string}`,
      data: approvalData.approval.data as `0x${string}`,
      value: BigInt(approvalData.approval.value || "0"),
    });
    await publicClient.waitForTransactionReceipt({ hash });
    console.log(`[Uniswap] Approval successful, transaction hash: ${hash}`);
  } else {
    console.log(`[Uniswap] Token already approved`);
  }

  // 2. Get quote
  console.log(`[Uniswap] Fetching quote for swap...`);

  const quoteParams: Record<string, unknown> = {
    swapper: account.address,
    tokenIn,
    tokenOut,
    tokenInChainId: String(uniswapConfig.chain.id),
    tokenOutChainId: String(uniswapConfig.chain.id),
    amount,
    type: "EXACT_INPUT",
    slippageTolerance: 0.5,
  };

  if (INTEGRATOR_FEE_BIPS && INTEGRATOR_FEE_RECIPIENT) {
    quoteParams.integratorFees = [
      {
        bips: parseInt(INTEGRATOR_FEE_BIPS),
        recipient: INTEGRATOR_FEE_RECIPIENT,
      },
    ];
  }

  const quoteRes = await axios.post(
    `${uniswapConfig.apiUrl}/quote`,
    quoteParams,
    {
      headers,
    },
  );

  const quoteResponse = quoteRes.data;
  console.log(
    `[Uniswap] Received quote successfully, routing: ${quoteResponse.routing}`,
  );

  // Sign permitData if present
  let signature: string | undefined;
  if (quoteResponse.permitData) {
    console.log(`[Uniswap] Signing Permit2/UniswapX typed data...`);
    const permitData = quoteResponse.permitData;

    const domain = { ...permitData.domain };
    if (domain.chainId) domain.chainId = Number(domain.chainId);

    const types = { ...permitData.types };
    // Viem automatically handles EIP712Domain, remove it if the API returned it
    if (types.EIP712Domain) delete types.EIP712Domain;

    let primaryType = "";
    if (types.PermitSingle) primaryType = "PermitSingle";
    else if (types.PermitBatch) primaryType = "PermitBatch";
    else if (types.PermitTransferFrom) primaryType = "PermitTransferFrom";
    else if (types.PermitBatchTransferFrom)
      primaryType = "PermitBatchTransferFrom";
    else if (types.ExclusiveDutchOrder) primaryType = "ExclusiveDutchOrder";
    else if (types.DutchOrder) primaryType = "DutchOrder";
    else primaryType = Object.keys(types)[0];

    signature = await account.signTypedData({
      domain,
      types,
      primaryType,
      message: permitData.values,
    });
    console.log(`[Uniswap] Signature generated successfully`);
  }

  // 3. Execute swap
  console.log(`[Uniswap] Submitting swap request to Trading API...`);
  const swapRequest = prepareUniswapSwapRequest(quoteResponse, signature);

  const swapRes = await axios.post(
    `${uniswapConfig.apiUrl}/swap`,
    swapRequest,
    { headers },
  );
  const swapData = swapRes.data;

  // 4. Validate before broadcasting
  validateUniswapSwap(swapData.swap);

  console.log(`[Uniswap] Broadcasting swap transaction on-chain...`);
  const hash = await walletClient.sendTransaction({
    to: swapData.swap.to as `0x${string}`,
    data: swapData.swap.data as `0x${string}`,
    value: BigInt(swapData.swap.value || "0"),
  });

  console.log(`[Uniswap] Waiting for transaction confirmation...`);
  const receipt = await publicClient.waitForTransactionReceipt({ hash });

  console.log(
    `[Uniswap] Swap transaction confirmed, transaction hash: ${receipt.transactionHash}`,
  );

  return receipt.transactionHash;
}
