# TACT Compilation Report
Contract: TestContract
BOC Size: 2581 bytes

# Types
Total Types: 13

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
TLB: `_ total_bet_a:uint32 total_bet_b:uint32 odds_a:uint32 odds_b:uint32 bets_a:dict<address, int> bets_b:dict<address, int> finalized:bool outcome_a_wins:bool insufficient_balance:bool = Data`
Signature: `Data{total_bet_a:uint32,total_bet_b:uint32,odds_a:uint32,odds_b:uint32,bets_a:dict<address, int>,bets_b:dict<address, int>,finalized:bool,outcome_a_wins:bool,insufficient_balance:bool}`

## BetInfo
TLB: `_ title:^string source:^string bet_a_name:^string bet_b_name:^string image:^string odds_a:uint32 odds_b:uint32 = BetInfo`
Signature: `BetInfo{title:^string,source:^string,bet_a_name:^string,bet_b_name:^string,image:^string,odds_a:uint32,odds_b:uint32}`

## Finalize
TLB: `finalize#d23bb096 outcome_a_wins:bool = Finalize`
Signature: `Finalize{outcome_a_wins:bool}`

## BetInfoInit
TLB: `bet_info_init#b028071f title:^string source:^string bet_a_name:^string bet_b_name:^string image:^string = BetInfoInit`
Signature: `BetInfoInit{title:^string,source:^string,bet_a_name:^string,bet_b_name:^string,image:^string}`

# Get Methods
Total Get Methods: 10

## getTotalBetA

## getTotalBetB

## getBalance

## getoddA

## getoddB

## outcome

## finalize

## getBetInfo

## owner

## stopped

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
4396: Only for owner
40368: Contract stopped
49684: Only the owner can finalize
53296: Contract not stopped
63076: Betting is over