import { createFailedApiResponse, createSuccessApiResponse } from "@/lib/api";
import { generatePrivateKey, privateKeyToAccount } from "viem/accounts";

export async function POST() {
  try {
    console.log("[Accounts API] Handling post request...");

    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);
    const address = account.address;

    return createSuccessApiResponse({ address, privateKey });
  } catch (error) {
    console.error("[Executor API] Failed to handle post request,", error);
    return createFailedApiResponse({ message: "Internal server error" }, 500);
  }
}
