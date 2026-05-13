import { network } from "hardhat";
import { parseEther } from "viem/utils";

async function main() {
  console.log("Deploying AgenticIdentity contract...");

  const { viem, networkName } = await network.connect();
  console.log("Network name:", networkName);

  const [deployer] = await viem.getWalletClients();
  console.log("Deployer address:", deployer.account.address);

  const contract = await viem.deployContract("AgenticIdentity", [
    "AgenticIdentity",
    "AGID",
    parseEther("0.1"),
  ]);
  console.log("Contract address:", contract.address);

  console.log("AgenticIdentity contract deployed");
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
