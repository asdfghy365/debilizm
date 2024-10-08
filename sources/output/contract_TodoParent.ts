import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    let sc_0 = slice;
    let _code = sc_0.loadRef();
    let _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    let _code = source.readCell();
    let _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    let builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounced: boolean;
    sender: Address;
    value: bigint;
    raw: Cell;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounced);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw);
    };
}

export function loadContext(slice: Slice) {
    let sc_0 = slice;
    let _bounced = sc_0.loadBit();
    let _sender = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _raw = sc_0.loadRef();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    let _bounced = source.readBoolean();
    let _sender = source.readAddress();
    let _value = source.readBigNumber();
    let _raw = source.readCell();
    return { $$type: 'Context' as const, bounced: _bounced, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounced);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw);
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    bounce: boolean;
    to: Address;
    value: bigint;
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeBit(src.bounce);
        b_0.storeAddress(src.to);
        b_0.storeInt(src.value, 257);
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
    };
}

export function loadSendParameters(slice: Slice) {
    let sc_0 = slice;
    let _bounce = sc_0.loadBit();
    let _to = sc_0.loadAddress();
    let _value = sc_0.loadIntBig(257);
    let _mode = sc_0.loadIntBig(257);
    let _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    let _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function loadTupleSendParameters(source: TupleReader) {
    let _bounce = source.readBoolean();
    let _to = source.readAddress();
    let _value = source.readBigNumber();
    let _mode = source.readBigNumber();
    let _body = source.readCellOpt();
    let _code = source.readCellOpt();
    let _data = source.readCellOpt();
    return { $$type: 'SendParameters' as const, bounce: _bounce, to: _to, value: _value, mode: _mode, body: _body, code: _code, data: _data };
}

function storeTupleSendParameters(source: SendParameters) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.bounce);
    builder.writeAddress(source.to);
    builder.writeNumber(source.value);
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    let _queryId = sc_0.loadUintBig(64);
    let _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    let _queryId = source.readBigNumber();
    let _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Bet = {
    $$type: 'Bet';
    address: Address;
    amount: bigint;
}

export function storeBet(src: Bet) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.address);
        b_0.storeUint(src.amount, 32);
    };
}

export function loadBet(slice: Slice) {
    let sc_0 = slice;
    let _address = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(32);
    return { $$type: 'Bet' as const, address: _address, amount: _amount };
}

function loadTupleBet(source: TupleReader) {
    let _address = source.readAddress();
    let _amount = source.readBigNumber();
    return { $$type: 'Bet' as const, address: _address, amount: _amount };
}

function storeTupleBet(source: Bet) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.address);
    builder.writeNumber(source.amount);
    return builder.build();
}

function dictValueParserBet(): DictionaryValue<Bet> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBet(src)).endCell());
        },
        parse: (src) => {
            return loadBet(src.loadRef().beginParse());
        }
    }
}

export type Data = {
    $$type: 'Data';
    total_bet_a: bigint;
    total_bet_b: bigint;
    odds_a: bigint;
    odds_b: bigint;
    bets_a: Dictionary<Address, bigint>;
    bets_b: Dictionary<Address, bigint>;
    bets_total: Dictionary<Address, bigint>;
    finalized: boolean;
    outcome_a_wins: boolean;
    insufficient_balance: boolean;
}

export function storeData(src: Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.total_bet_a, 64);
        b_0.storeUint(src.total_bet_b, 64);
        b_0.storeUint(src.odds_a, 64);
        b_0.storeUint(src.odds_b, 64);
        b_0.storeDict(src.bets_a, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeDict(src.bets_b, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeDict(src.bets_total, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeBit(src.finalized);
        b_0.storeBit(src.outcome_a_wins);
        b_0.storeBit(src.insufficient_balance);
    };
}

export function loadData(slice: Slice) {
    let sc_0 = slice;
    let _total_bet_a = sc_0.loadUintBig(64);
    let _total_bet_b = sc_0.loadUintBig(64);
    let _odds_a = sc_0.loadUintBig(64);
    let _odds_b = sc_0.loadUintBig(64);
    let _bets_a = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _bets_b = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _bets_total = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _finalized = sc_0.loadBit();
    let _outcome_a_wins = sc_0.loadBit();
    let _insufficient_balance = sc_0.loadBit();
    return { $$type: 'Data' as const, total_bet_a: _total_bet_a, total_bet_b: _total_bet_b, odds_a: _odds_a, odds_b: _odds_b, bets_a: _bets_a, bets_b: _bets_b, bets_total: _bets_total, finalized: _finalized, outcome_a_wins: _outcome_a_wins, insufficient_balance: _insufficient_balance };
}

function loadTupleData(source: TupleReader) {
    let _total_bet_a = source.readBigNumber();
    let _total_bet_b = source.readBigNumber();
    let _odds_a = source.readBigNumber();
    let _odds_b = source.readBigNumber();
    let _bets_a = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _bets_b = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _bets_total = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _finalized = source.readBoolean();
    let _outcome_a_wins = source.readBoolean();
    let _insufficient_balance = source.readBoolean();
    return { $$type: 'Data' as const, total_bet_a: _total_bet_a, total_bet_b: _total_bet_b, odds_a: _odds_a, odds_b: _odds_b, bets_a: _bets_a, bets_b: _bets_b, bets_total: _bets_total, finalized: _finalized, outcome_a_wins: _outcome_a_wins, insufficient_balance: _insufficient_balance };
}

function storeTupleData(source: Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_bet_a);
    builder.writeNumber(source.total_bet_b);
    builder.writeNumber(source.odds_a);
    builder.writeNumber(source.odds_b);
    builder.writeCell(source.bets_a.size > 0 ? beginCell().storeDictDirect(source.bets_a, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.bets_b.size > 0 ? beginCell().storeDictDirect(source.bets_b, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.bets_total.size > 0 ? beginCell().storeDictDirect(source.bets_total, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeBoolean(source.finalized);
    builder.writeBoolean(source.outcome_a_wins);
    builder.writeBoolean(source.insufficient_balance);
    return builder.build();
}

function dictValueParserData(): DictionaryValue<Data> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeData(src)).endCell());
        },
        parse: (src) => {
            return loadData(src.loadRef().beginParse());
        }
    }
}

export type BetInfo = {
    $$type: 'BetInfo';
    title: string;
    source: string;
    bet_a_name: string;
    bet_b_name: string;
    image: string;
    odds_a: bigint;
    odds_b: bigint;
    finishDate: bigint;
    total_bet_a: bigint;
    total_bet_b: bigint;
    winnerOption: bigint;
}

export function storeBetInfo(src: BetInfo) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.title);
        b_0.storeStringRefTail(src.source);
        b_0.storeStringRefTail(src.bet_a_name);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.bet_b_name);
        b_1.storeStringRefTail(src.image);
        b_1.storeUint(src.odds_a, 64);
        b_1.storeUint(src.odds_b, 64);
        b_1.storeUint(src.finishDate, 32);
        b_1.storeUint(src.total_bet_a, 64);
        b_1.storeUint(src.total_bet_b, 64);
        b_1.storeUint(src.winnerOption, 8);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBetInfo(slice: Slice) {
    let sc_0 = slice;
    let _title = sc_0.loadStringRefTail();
    let _source = sc_0.loadStringRefTail();
    let _bet_a_name = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _bet_b_name = sc_1.loadStringRefTail();
    let _image = sc_1.loadStringRefTail();
    let _odds_a = sc_1.loadUintBig(64);
    let _odds_b = sc_1.loadUintBig(64);
    let _finishDate = sc_1.loadUintBig(32);
    let _total_bet_a = sc_1.loadUintBig(64);
    let _total_bet_b = sc_1.loadUintBig(64);
    let _winnerOption = sc_1.loadUintBig(8);
    return { $$type: 'BetInfo' as const, title: _title, source: _source, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image, odds_a: _odds_a, odds_b: _odds_b, finishDate: _finishDate, total_bet_a: _total_bet_a, total_bet_b: _total_bet_b, winnerOption: _winnerOption };
}

function loadTupleBetInfo(source: TupleReader) {
    let _title = source.readString();
    let _source = source.readString();
    let _bet_a_name = source.readString();
    let _bet_b_name = source.readString();
    let _image = source.readString();
    let _odds_a = source.readBigNumber();
    let _odds_b = source.readBigNumber();
    let _finishDate = source.readBigNumber();
    let _total_bet_a = source.readBigNumber();
    let _total_bet_b = source.readBigNumber();
    let _winnerOption = source.readBigNumber();
    return { $$type: 'BetInfo' as const, title: _title, source: _source, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image, odds_a: _odds_a, odds_b: _odds_b, finishDate: _finishDate, total_bet_a: _total_bet_a, total_bet_b: _total_bet_b, winnerOption: _winnerOption };
}

function storeTupleBetInfo(source: BetInfo) {
    let builder = new TupleBuilder();
    builder.writeString(source.title);
    builder.writeString(source.source);
    builder.writeString(source.bet_a_name);
    builder.writeString(source.bet_b_name);
    builder.writeString(source.image);
    builder.writeNumber(source.odds_a);
    builder.writeNumber(source.odds_b);
    builder.writeNumber(source.finishDate);
    builder.writeNumber(source.total_bet_a);
    builder.writeNumber(source.total_bet_b);
    builder.writeNumber(source.winnerOption);
    return builder.build();
}

function dictValueParserBetInfo(): DictionaryValue<BetInfo> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBetInfo(src)).endCell());
        },
        parse: (src) => {
            return loadBetInfo(src.loadRef().beginParse());
        }
    }
}

export type BetDetails = {
    $$type: 'BetDetails';
    user: Address;
    amount: bigint;
    betContract: Address;
    outcome: bigint;
}

export function storeBetDetails(src: BetDetails) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeAddress(src.user);
        b_0.storeUint(src.amount, 32);
        b_0.storeAddress(src.betContract);
        b_0.storeUint(src.outcome, 8);
    };
}

export function loadBetDetails(slice: Slice) {
    let sc_0 = slice;
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadUintBig(32);
    let _betContract = sc_0.loadAddress();
    let _outcome = sc_0.loadUintBig(8);
    return { $$type: 'BetDetails' as const, user: _user, amount: _amount, betContract: _betContract, outcome: _outcome };
}

function loadTupleBetDetails(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    let _betContract = source.readAddress();
    let _outcome = source.readBigNumber();
    return { $$type: 'BetDetails' as const, user: _user, amount: _amount, betContract: _betContract, outcome: _outcome };
}

function storeTupleBetDetails(source: BetDetails) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.betContract);
    builder.writeNumber(source.outcome);
    return builder.build();
}

function dictValueParserBetDetails(): DictionaryValue<BetDetails> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBetDetails(src)).endCell());
        },
        parse: (src) => {
            return loadBetDetails(src.loadRef().beginParse());
        }
    }
}

export type BetArray = {
    $$type: 'BetArray';
    map: Dictionary<bigint, BetDetails>;
    length: bigint;
}

export function storeBetArray(src: BetArray) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeDict(src.map, Dictionary.Keys.BigInt(257), dictValueParserBetDetails());
        b_0.storeUint(src.length, 32);
    };
}

export function loadBetArray(slice: Slice) {
    let sc_0 = slice;
    let _map = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserBetDetails(), sc_0);
    let _length = sc_0.loadUintBig(32);
    return { $$type: 'BetArray' as const, map: _map, length: _length };
}

function loadTupleBetArray(source: TupleReader) {
    let _map = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserBetDetails(), source.readCellOpt());
    let _length = source.readBigNumber();
    return { $$type: 'BetArray' as const, map: _map, length: _length };
}

function storeTupleBetArray(source: BetArray) {
    let builder = new TupleBuilder();
    builder.writeCell(source.map.size > 0 ? beginCell().storeDictDirect(source.map, Dictionary.Keys.BigInt(257), dictValueParserBetDetails()).endCell() : null);
    builder.writeNumber(source.length);
    return builder.build();
}

function dictValueParserBetArray(): DictionaryValue<BetArray> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBetArray(src)).endCell());
        },
        parse: (src) => {
            return loadBetArray(src.loadRef().beginParse());
        }
    }
}

export type BetDetailsMessage = {
    $$type: 'BetDetailsMessage';
    user: Address;
    amount: bigint;
    betContract: Address;
    outcome: bigint;
}

export function storeBetDetailsMessage(src: BetDetailsMessage) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3696589863, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.betContract);
        b_0.storeUint(src.outcome, 8);
    };
}

export function loadBetDetailsMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3696589863) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _betContract = sc_0.loadAddress();
    let _outcome = sc_0.loadUintBig(8);
    return { $$type: 'BetDetailsMessage' as const, user: _user, amount: _amount, betContract: _betContract, outcome: _outcome };
}

function loadTupleBetDetailsMessage(source: TupleReader) {
    let _user = source.readAddress();
    let _amount = source.readBigNumber();
    let _betContract = source.readAddress();
    let _outcome = source.readBigNumber();
    return { $$type: 'BetDetailsMessage' as const, user: _user, amount: _amount, betContract: _betContract, outcome: _outcome };
}

function storeTupleBetDetailsMessage(source: BetDetailsMessage) {
    let builder = new TupleBuilder();
    builder.writeAddress(source.user);
    builder.writeNumber(source.amount);
    builder.writeAddress(source.betContract);
    builder.writeNumber(source.outcome);
    return builder.build();
}

function dictValueParserBetDetailsMessage(): DictionaryValue<BetDetailsMessage> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBetDetailsMessage(src)).endCell());
        },
        parse: (src) => {
            return loadBetDetailsMessage(src.loadRef().beginParse());
        }
    }
}

export type Finalize = {
    $$type: 'Finalize';
    outcome_a_wins: boolean;
}

export function storeFinalize(src: Finalize) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(3527127190, 32);
        b_0.storeBit(src.outcome_a_wins);
    };
}

export function loadFinalize(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 3527127190) { throw Error('Invalid prefix'); }
    let _outcome_a_wins = sc_0.loadBit();
    return { $$type: 'Finalize' as const, outcome_a_wins: _outcome_a_wins };
}

function loadTupleFinalize(source: TupleReader) {
    let _outcome_a_wins = source.readBoolean();
    return { $$type: 'Finalize' as const, outcome_a_wins: _outcome_a_wins };
}

function storeTupleFinalize(source: Finalize) {
    let builder = new TupleBuilder();
    builder.writeBoolean(source.outcome_a_wins);
    return builder.build();
}

function dictValueParserFinalize(): DictionaryValue<Finalize> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeFinalize(src)).endCell());
        },
        parse: (src) => {
            return loadFinalize(src.loadRef().beginParse());
        }
    }
}

export type BetInfoInit = {
    $$type: 'BetInfoInit';
    title: string;
    source: string;
    bet_a_name: string;
    bet_b_name: string;
    image: string;
}

export function storeBetInfoInit(src: BetInfoInit) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(2955413279, 32);
        b_0.storeStringRefTail(src.title);
        b_0.storeStringRefTail(src.source);
        b_0.storeStringRefTail(src.bet_a_name);
        let b_1 = new Builder();
        b_1.storeStringRefTail(src.bet_b_name);
        b_1.storeStringRefTail(src.image);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBetInfoInit(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2955413279) { throw Error('Invalid prefix'); }
    let _title = sc_0.loadStringRefTail();
    let _source = sc_0.loadStringRefTail();
    let _bet_a_name = sc_0.loadStringRefTail();
    let sc_1 = sc_0.loadRef().beginParse();
    let _bet_b_name = sc_1.loadStringRefTail();
    let _image = sc_1.loadStringRefTail();
    return { $$type: 'BetInfoInit' as const, title: _title, source: _source, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image };
}

function loadTupleBetInfoInit(source: TupleReader) {
    let _title = source.readString();
    let _source = source.readString();
    let _bet_a_name = source.readString();
    let _bet_b_name = source.readString();
    let _image = source.readString();
    return { $$type: 'BetInfoInit' as const, title: _title, source: _source, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image };
}

function storeTupleBetInfoInit(source: BetInfoInit) {
    let builder = new TupleBuilder();
    builder.writeString(source.title);
    builder.writeString(source.source);
    builder.writeString(source.bet_a_name);
    builder.writeString(source.bet_b_name);
    builder.writeString(source.image);
    return builder.build();
}

function dictValueParserBetInfoInit(): DictionaryValue<BetInfoInit> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeBetInfoInit(src)).endCell());
        },
        parse: (src) => {
            return loadBetInfoInit(src.loadRef().beginParse());
        }
    }
}

 type TodoParent_init_args = {
    $$type: 'TodoParent_init_args';
}

function initTodoParent_init_args(src: TodoParent_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
    };
}

async function TodoParent_init() {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTodoParent_init_args({ $$type: 'TodoParent_init_args' })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TodoParent_errors: { [key: number]: { message: string } } = {
    2: { message: `Stack undeflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    13: { message: `Out of gas error` },
    32: { message: `Method ID not found` },
    34: { message: `Action is invalid or not supported` },
    37: { message: `Not enough TON` },
    38: { message: `Not enough extra-currencies` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid address` },
    137: { message: `Masterchain support is not enabled for this contract` },
    2977: { message: `Already initialized` },
    5194: { message: `Bet amount must be greater than the fixed fee` },
    12446: { message: `No space left in the array for new items!` },
    15338: { message: `Only owner can create bets` },
    40368: { message: `Contract stopped` },
    44933: { message: `Only the admin can finalize` },
    53296: { message: `Contract not stopped` },
    63076: { message: `Betting is over` },
}

const TodoParent_types: ABIType[] = [
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounced","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Bet","header":null,"fields":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Data","header":null,"fields":[{"name":"total_bet_a","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"total_bet_b","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"odds_a","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"odds_b","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"bets_a","type":{"kind":"dict","key":"address","value":"int"}},{"name":"bets_b","type":{"kind":"dict","key":"address","value":"int"}},{"name":"bets_total","type":{"kind":"dict","key":"address","value":"int"}},{"name":"finalized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"outcome_a_wins","type":{"kind":"simple","type":"bool","optional":false}},{"name":"insufficient_balance","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BetInfo","header":null,"fields":[{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"source","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_a_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_b_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}},{"name":"odds_a","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"odds_b","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"finishDate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"total_bet_a","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"total_bet_b","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"winnerOption","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"BetDetails","header":null,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"betContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"outcome","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"BetArray","header":null,"fields":[{"name":"map","type":{"kind":"dict","key":"int","value":"BetDetails","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"BetDetailsMessage","header":3696589863,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"betContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"outcome","type":{"kind":"simple","type":"uint","optional":false,"format":8}}]},
    {"name":"Finalize","header":3527127190,"fields":[{"name":"outcome_a_wins","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BetInfoInit","header":2955413279,"fields":[{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"source","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_a_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_b_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}}]},
]

const TodoParent_getters: ABIGetter[] = [
    {"name":"numChildren","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"UserBetInfo","arguments":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"dict","key":"int","value":"BetDetails","valueFormat":"ref"}},
    {"name":"getAllAddresses","arguments":[],"returnType":{"kind":"dict","key":"int","value":"address"}},
]

const TodoParent_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"empty"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BetInfoInit"}},
    {"receiver":"internal","message":{"kind":"typed","type":"BetDetailsMessage"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export class TodoParent implements Contract {
    
    static async init() {
        return await TodoParent_init();
    }
    
    static async fromInit() {
        const init = await TodoParent_init();
        const address = contractAddress(0, init);
        return new TodoParent(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TodoParent(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TodoParent_types,
        getters: TodoParent_getters,
        receivers: TodoParent_receivers,
        errors: TodoParent_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: null | 'withdraw' | BetInfoInit | BetDetailsMessage | Deploy) {
        
        let body: Cell | null = null;
        if (message === null) {
            body = new Cell();
        }
        if (message === 'withdraw') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BetInfoInit') {
            body = beginCell().store(storeBetInfoInit(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BetDetailsMessage') {
            body = beginCell().store(storeBetDetailsMessage(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getNumChildren(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('numChildren', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getUserBetInfo(provider: ContractProvider, user: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(user);
        let source = (await provider.get('UserBetInfo', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), dictValueParserBetDetails(), source.readCellOpt());
        return result;
    }
    
    async getGetAllAddresses(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getAllAddresses', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
        return result;
    }
    
}