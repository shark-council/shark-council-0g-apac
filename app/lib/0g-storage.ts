import { zerogConfig } from "@/config/0g";
import { Indexer, MemData } from "@0gfoundation/0g-storage-ts-sdk";
import { ethers } from "ethers";

export async function uploadTextTo0gStorage(text: string) {
  console.log("[0G Storage Lib] Uploading text...");

  const accountPrivateKey = process.env.ACCOUNT_PRIVATE_KEY as string;
  const provider = new ethers.JsonRpcProvider(zerogConfig.storage.rpcUrl);
  const signer = new ethers.Wallet(accountPrivateKey, provider);
  const indexer = new Indexer(zerogConfig.storage.indexerRpc);

  const data = new TextEncoder().encode(text);
  const memData = new MemData(data);

  const key = crypto.getRandomValues(new Uint8Array(32));
  console.log("[0G Storage Lib] Generated encryption key:", key);

  const [uploadTx, uploadError] = await indexer.upload(
    memData,
    zerogConfig.storage.rpcUrl,
    signer,
    { encryption: { type: "aes256", key: key } },
  );

  if (uploadError !== null) {
    throw new Error(`Upload error: ${uploadError}`);
  }

  console.log("[0G Storage Lib] Upload transaction:", uploadTx);

  return { key: ethers.hexlify(key), uploadTx };
}
