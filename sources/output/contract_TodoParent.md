# TACT Compilation Report
Contract: TodoParent
BOC Size: 1751 bytes

# Types
Total Types: 16

## StateInit
TLB: `_ code:^cell data:^cell = StateInit`
Signature: `StateInit{code:^cell,data:^cell}`

## Context
TLB: `_ bounced:bool sender:address value:int257 raw:^slice = Context`
Signature: `Context{bounced:bool,sender:address,value:int257,raw:^slice}`

## SendParameters
TLB: `_ bounce:bool to:address value:int257 mode:int257 body:Maybe ^cell code:Maybe ^cell data:Maybe ^cell = SendParameters`
Signature: `SendParameters{bounce:bool,to:address,value:int257,mode:int257,body:Maybe ^cell,code:Maybe ^cell,data:Maybe ^cell}`

## Deploy
TLB: `deploy#946a98b6 queryId:uint64 = Deploy`
Signature: `Deploy{queryId:uint64}`

## DeployOk
TLB: `deploy_ok#aff90f57 queryId:uint64 = DeployOk`
Signature: `DeployOk{queryId:uint64}`

## FactoryDeploy
TLB: `factory_deploy#6d0ff13b queryId:uint64 cashback:address = FactoryDeploy`
Signature: `FactoryDeploy{queryId:uint64,cashback:address}`

## ChangeOwner
TLB: `change_owner#819dbe99 queryId:uint64 newOwner:address = ChangeOwner`
Signature: `ChangeOwner{queryId:uint64,newOwner:address}`

## ChangeOwnerOk
TLB: `change_owner_ok#327b2b4a queryId:uint64 newOwner:address = ChangeOwnerOk`
Signature: `ChangeOwnerOk{queryId:uint64,newOwner:address}`

## Bet
TLB: `_ address:address amount:uint32 = Bet`
Signature: `Bet{address:address,amount:uint32}`

## Data
TLB: `_ total_bet_a:uint64 total_bet_b:uint64 odds_a:uint64 odds_b:uint64 bets_a:dict<address, int> bets_b:dict<address, int> bets_total:dict<address, int> finalized:bool outcome_a_wins:bool insufficient_balance:bool = Data`
Signature: `Data{total_bet_a:uint64,total_bet_b:uint64,odds_a:uint64,odds_b:uint64,bets_a:dict<address, int>,bets_b:dict<address, int>,bets_total:dict<address, int>,finalized:bool,outcome_a_wins:bool,insufficient_balance:bool}`

## BetInfo
TLB: `_ title:^string source:^string bet_a_name:^string bet_b_name:^string image:^string odds_a:uint64 odds_b:uint64 finishDate:uint32 total_bet_a:uint64 total_bet_b:uint64 winnerOption:uint8 = BetInfo`
Signature: `BetInfo{title:^string,source:^string,bet_a_name:^string,bet_b_name:^string,image:^string,odds_a:uint64,odds_b:uint64,finishDate:uint32,total_bet_a:uint64,total_bet_b:uint64,winnerOption:uint8}`

## BetDetails
TLB: `_ user:address amount:uint32 betContract:address outcome:uint8 = BetDetails`
Signature: `BetDetails{user:address,amount:uint32,betContract:address,outcome:uint8}`

## BetArray
TLB: `_ map:dict<int, ^BetDetails{user:address,amount:uint32,betContract:address,outcome:uint8}> length:uint32 = BetArray`
Signature: `BetArray{map:dict<int, ^BetDetails{user:address,amount:uint32,betContract:address,outcome:uint8}>,length:uint32}`

## BetDetailsMessage
TLB: `bet_details_message#dc557c27 user:address amount:int257 betContract:address outcome:uint8 = BetDetailsMessage`
Signature: `BetDetailsMessage{user:address,amount:int257,betContract:address,outcome:uint8}`

## Finalize
TLB: `finalize#d23bb096 outcome_a_wins:bool = Finalize`
Signature: `Finalize{outcome_a_wins:bool}`

## BetInfoInit
TLB: `bet_info_init#b028071f title:^string source:^string bet_a_name:^string bet_b_name:^string image:^string = BetInfoInit`
Signature: `BetInfoInit{title:^string,source:^string,bet_a_name:^string,bet_b_name:^string,image:^string}`

# Get Methods
Total Get Methods: 3

## numChildren

## UserBetInfo
Argument: user

## getAllAddresses

# Error Codes
2: Stack undeflow
3: Stack overflow
4: Integer overflow
5: Integer out of expected range
6: Invalid opcode
7: Type check error
8: Cell overflow
9: Cell underflow
10: Dictionary error
13: Out of gas error
32: Method ID not found
34: Action is invalid or not supported
37: Not enough TON
38: Not enough extra-currencies
128: Null reference exception
129: Invalid serialization prefix
130: Invalid incoming message
131: Constraints error
132: Access denied
133: Contract stopped
134: Invalid argument
135: Code of a contract was not found
136: Invalid address
137: Masterchain support is not enabled for this contract
2977: Already initialized
5194: Bet amount must be greater than the fixed fee
12446: No space left in the array for new items!
15338: Only owner can create bets
40368: Contract stopped
44933: Only the admin can finalize
53296: Contract not stopped
63076: Betting is over