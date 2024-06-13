import { toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { TestContract } from "./output/contract_TestContract";
import { beginCell } from "@ton/core";
import { Verbosity } from "@tact-lang/emulator";
import { inspect } from "util";



describe("TestContract", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let admin = system.treasure("admin");
        let contract = system.open(await TestContract.fromInit());
        system.name(contract.address, "main");
        let track = system.track(contract);
        expect(track.collect()).toMatchInlineSnapshot(`[]`);
    });

    it("should return the correct total bet on A", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let admin = system.treasure("admin");
        let user = system.treasure("user");
        let contract = system.open(await TestContract.fromInit());
        system.name(contract.address, "main");
        let logger = system.treasure("logtressure");
        let track = system.track(contract);

        // Send a bet on A
        let betAmount = toNano(0.1);
        const payloadCell = beginCell()
            .storeBit(true) // bet_on_a: true (bet on A)
            .storeCoins(betAmount) // bet_amount
            .endCell();
        const payloadSlice = payloadCell.beginParse(); // Convert the cell to a slice

        await contract.send(user, { value: betAmount }, "1");
        await system.run();

        // Call getTotalBetA and verify the result
        const totalBetA = (await contract.getGetTotalBetA());
        expect(totalBetA).toBe(betAmount);
        console.log(inspect(totalBetA));

    });

    it("should return false for isFinalized", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let admin = system.treasure("admin");
        let contract = system.open(await TestContract.fromInit());
        system.name(contract.address, "main");

        // Call isFinalized and verify the result
        const isFinalized = await contract.getIsFinalized();
        expect(isFinalized).toBe(false);
    });

    
});
