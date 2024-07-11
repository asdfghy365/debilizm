import { ContractProvider, Sender, toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { Blockchain, SandboxContract, TreasuryContract } from "@ton/sandbox";
import { TestContract } from "./output/contract_TestContract";

describe("TestContract Deployment", () => {
  let blockchain: Blockchain;
  let wallet1: SandboxContract<TreasuryContract>;
  let counterContract: SandboxContract<TestContract>;

  it("should receive 1 on A", async () => {
    

    let system = await ContractSystem.create();
    let nonOwner = system.treasure("non-owner");
    let contract = system.open(await TestContract.fromInit(BigInt(1)));
    system.name(contract.address, "main");

    const oddA = await contract.getGetoddA();
    console.log("Value of getoddA:", oddA);
  });
});
