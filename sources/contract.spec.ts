import { toNano } from "@ton/core";
import { ContractSystem } from "@tact-lang/emulator";
import { TestContract } from "./output/contract_TestContract";

describe("TestContract Deployment", () => {
    it("should deploy correctly", async () => {
        // Create ContractSystem and deploy contract
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await TestContract.fromInit(BigInt(2)));
        system.name(contract.address, "main");
        let track = system.track(contract);

        // Deploy the contract
        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: BigInt(0) });
        await system.run();
        expect(track.collect()).toMatchInlineSnapshot(`
            [
              {
                "$seq": 0,
                "events": [
                  {
                    "$type": "deploy",
                  },
                  {
                    "$type": "received",
                    "message": {
                      "body": {
                        "type": "known",
                        "value": {
                          "$$type": "Deploy",
                          "queryId": 0n,
                        },
                      },
                      "bounce": true,
                      "from": "@treasure(owner)",
                      "to": "@main",
                      "type": "internal",
                      "value": "1",
                    },
                  },
                  {
                    "$type": "processed",
                    "gasUsed": 8737n,
                  },
                  {
                    "$type": "sent",
                    "messages": [
                      {
                        "body": {
                          "type": "known",
                          "value": {
                            "$$type": "DeployOk",
                            "queryId": 0n,
                          },
                        },
                        "bounce": false,
                        "from": "@main",
                        "to": "@treasure(owner)",
                        "type": "internal",
                        "value": "0.990067",
                      },
                    ],
                  },
                ],
              },
            ]
        `);
    });

    it("should receive 1 on A", async () => {
        let system = await ContractSystem.create();
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await TestContract.fromInit(BigInt(1)));
        system.name(contract.address, "main");

        await contract.send(nonOwner, { value: toNano(2) }, "1");
        await contract.send(nonOwner, { value: toNano(1) }, "2");
        await system.run();
        expect(await contract.getGetTotalBetA()).toEqual(toNano(2));
        expect(await contract.getGetTotalBetB()).toEqual(toNano(1));

        const oddA = await contract.getGetoddA();
        console.log("Value of getoddA:", oddA);

        const isInsufficientBalance = await contract.getIsInsufficientBalance();
        console.log("is it?:", isInsufficientBalance);
    });

    it("second deploy", async () => {
        let system = await ContractSystem.create();
        let owner = system.treasure("owner");
        let nonOwner = system.treasure("non-owner");
        let contract = system.open(await TestContract.fromInit(BigInt(1)));
        system.name(contract.address, "main");

        await contract.send(owner, { value: toNano(1) }, { $$type: "Deploy", queryId: BigInt(0) });
        await system.run();
        await contract.send(nonOwner, { value: toNano(2) }, "Zhopa");
        await system.run();
    });
});
