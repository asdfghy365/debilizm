import { ContractProvider, Sender, toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { TestContract } from "./output/contract_TestContract";

describe("TestContract Deployment", () => {
  it("should receive 1 on A", async () => {
    jest.setTimeout(20000);  // Increase the timeout to 20 seconds

    let system = await ContractSystem.create();
    let nonOwner = system.treasure("non-owner");
    let contract = system.open(await TestContract.fromInit(BigInt(1)));
    system.name(contract.address, "main");


    await contract.send(nonOwner, { value: toNano(19) }, "1");
    await contract.send(nonOwner, { value: toNano(20) }, "2");
    await system.run();


    const totalBetA = await contract.getGetTotalBetA();


    const totalBetB = await contract.getGetTotalBetB();


    const oddA = await contract.getGetoddA();
    console.log("Value of getoddA:", oddA);
    console.log(totalBetB);
    console.log(totalBetA);
  });
});
