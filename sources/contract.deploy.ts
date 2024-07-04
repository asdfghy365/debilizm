import * as fs from "fs";
import * as path from "path";
import { Address, contractAddress } from "@ton/core";
import { TodoParent } from "./output/contract_TodoParent";
import { prepareTactDeployment } from "@tact-lang/deployer";

(async () => {
    try {
        // Parameters
        const testnet = true;
        const packageName = "contract_TodoParent.pkg";
        const init = await TodoParent.init();
        

        // Load required data
        const address = contractAddress(0, init);
        const data = init.data.toBoc();
        const pkg = fs.readFileSync(path.resolve(__dirname, "output", packageName));

        // Preparing
        console.log("Uploading package...");
        const prepare = await prepareTactDeployment({ pkg, data, testnet });

        // Deploying
        console.log("============================================================================================");
        console.log("Contract Address");
        console.log("============================================================================================");
        console.log();
        console.log(address.toString({ testOnly: testnet }));
        console.log();
        console.log("============================================================================================");
        console.log("Please, follow deployment link");
        console.log("============================================================================================");
        console.log();
        console.log(prepare);
        console.log();
        console.log("============================================================================================");
    } catch (error) {
        console.error("An error occurred during the deployment process:", error);
    }
})();
