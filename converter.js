const { beginCell, toNano } = require("@ton/core");

let betAmount = toNano(0.1); // Amount to bet (1 TON)
const payloadCell = beginCell()
    .storeBit(true)  
    .storeCoins(betAmount)  
    .endCell();
const base64Payload = payloadCell.toBoc().toString('base64');
console.log(base64Payload);
