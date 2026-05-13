import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { keccak256, parseEther, toHex } from "viem";
import { network } from "hardhat";

describe("AgenticIdentity", async function () {
  const { viem } = await network.create();
  const publicClient = await viem.getPublicClient();

  it("Should emit events and set intelligent data when calling the iMint() function", async function () {
    const mintFee = parseEther("0.0");
    const agenticIdentity = await viem.deployContract("AgenticIdentity", [
      "AgenticIdentity",
      "AGID",
      mintFee,
    ]);

    const [deployer] = await viem.getWalletClients();

    const agentName = "quant_expert";
    const agentModel = "gpt-4";
    const agentCapabilities = ["trading", "analysis"];
    const agentSystemPrompt = "You are a quantitative trading expert.";

    const datas = [
      {
        dataDescription: "agent_name",
        dataHash: keccak256(toHex(agentName.trim())),
      },
      {
        dataDescription: "model",
        dataHash: keccak256(toHex(agentModel)),
      },
      {
        dataDescription: "capabilities",
        dataHash: keccak256(toHex(agentCapabilities.join(","))),
      },
      {
        dataDescription: "system_prompt",
        dataHash: keccak256(toHex(agentSystemPrompt.trim() || "default")),
      },
    ];

    const tx = await agenticIdentity.write.iMint(
      [deployer.account.address, datas],
      {
        value: mintFee,
      },
    );

    const receipt = await publicClient.waitForTransactionReceipt({ hash: tx });
    assert.equal(receipt.status, "success");

    const tokenId = 0n;

    const storedDatas = (await agenticIdentity.read.getIntelligentDatas([
      tokenId,
    ])) as any[];

    assert.equal(storedDatas.length, 4);
    assert.equal(storedDatas[0].dataDescription, datas[0].dataDescription);
    assert.equal(storedDatas[0].dataHash, datas[0].dataHash);
    assert.equal(storedDatas[1].dataDescription, datas[1].dataDescription);
    assert.equal(storedDatas[1].dataHash, datas[1].dataHash);
    assert.equal(storedDatas[2].dataDescription, datas[2].dataDescription);
    assert.equal(storedDatas[2].dataHash, datas[2].dataHash);
    assert.equal(storedDatas[3].dataDescription, datas[3].dataDescription);
    assert.equal(storedDatas[3].dataHash, datas[3].dataHash);
  });

  it("Should allow operator to update reputation and non-operator to fail", async function () {
    const mintFee = parseEther("0.0");
    const agenticIdentity = await viem.deployContract("AgenticIdentity", [
      "AgenticIdentity",
      "AGID",
      mintFee,
    ]);

    const [deployer, nonOperator] = await viem.getWalletClients();

    // Mint a token to deployer
    await agenticIdentity.write.mint([deployer.account.address], {
      value: mintFee,
    });
    const tokenId = 0n;

    const reputation = {
      debates: 7n,
      totalTrades: 4n,
      closedTrades: 3n,
      winningTrades: 2n,
      losingTrades: 1n,
    };

    // Operator (deployer) updates reputation
    await agenticIdentity.write.updateReputation([tokenId, reputation]);

    // Check reputation
    const storedReputation = (await agenticIdentity.read.getReputation([
      tokenId,
    ])) as any;
    assert.equal(storedReputation.debates, 7n);
    assert.equal(storedReputation.totalTrades, 4n);
    assert.equal(storedReputation.closedTrades, 3n);
    assert.equal(storedReputation.winningTrades, 2n);
    assert.equal(storedReputation.losingTrades, 1n);

    // Non-operator fails to update reputation
    await assert.rejects(
      agenticIdentity.write.updateReputation([tokenId, reputation], {
        account: nonOperator.account,
      }),
    );
  });
});
