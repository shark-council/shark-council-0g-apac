import { PrivateKeyAccount, privateKeyToAccount } from "viem/accounts";
import { createPublicClient, erc20Abi, formatEther, http } from "viem";
import * as viemChains from "viem/chains";

export function getAccount(): PrivateKeyAccount {
  const accountPrivateKey = process.env.ACCOUNT_PRIVATE_KEY;
  if (!accountPrivateKey) {
    throw new Error("ACCOUNT_PRIVATE_KEY is not set");
  }
  return privateKeyToAccount(accountPrivateKey as `0x${string}`);
}

export function getAccountAddress(): `0x${string}` {
  const account = getAccount();
  return account.address;
}

export async function getAccountNativeBalance(
  chainId: number,
): Promise<string> {
  const address = getAccountAddress();
  const chain = Object.values(viemChains).find(
    (c) => "id" in c && c.id === chainId,
  ) as viemChains.Chain | undefined;

  if (!chain) {
    throw new Error(`Chain with ID ${chainId} not found in viem/chains`);
  }

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  });
  const balance = await publicClient.getBalance({ address });
  return formatEther(balance);
}

export async function getAccountTokenBalance(
  chainId: number,
  tokenAddress: string,
): Promise<string> {
  const address = getAccountAddress();
  const chain = Object.values(viemChains).find(
    (c) => "id" in c && c.id === chainId,
  ) as viemChains.Chain | undefined;

  if (!chain) {
    throw new Error(`Chain with ID ${chainId} not found in viem/chains`);
  }

  const publicClient = createPublicClient({
    chain,
    transport: http(),
  });
  const balance = await publicClient.readContract({
    address: tokenAddress as `0x${string}`,
    abi: erc20Abi,
    functionName: "balanceOf",
    args: [address],
  });
  return balance.toString();
}
