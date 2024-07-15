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
    return { $$type: 'BetInfo' as const, title: _title, source: _source, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image, odds_a: _odds_a, odds_b: _odds_b, finishDate: _finishDate, total_bet_a: _total_bet_a, total_bet_b: _total_bet_b };
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
    return { $$type: 'BetInfo' as const, title: _title, source: _source, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image, odds_a: _odds_a, odds_b: _odds_b, finishDate: _finishDate, total_bet_a: _total_bet_a, total_bet_b: _total_bet_b };
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
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.betContract);
        let b_1 = new Builder();
        b_1.storeInt(src.outcome, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBetDetails(slice: Slice) {
    let sc_0 = slice;
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _betContract = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _outcome = sc_1.loadIntBig(257);
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
        b_0.storeInt(src.length, 257);
    };
}

export function loadBetArray(slice: Slice) {
    let sc_0 = slice;
    let _map = Dictionary.load(Dictionary.Keys.BigInt(257), dictValueParserBetDetails(), sc_0);
    let _length = sc_0.loadIntBig(257);
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
        b_0.storeUint(2077863156, 32);
        b_0.storeAddress(src.user);
        b_0.storeInt(src.amount, 257);
        b_0.storeAddress(src.betContract);
        let b_1 = new Builder();
        b_1.storeInt(src.outcome, 257);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadBetDetailsMessage(slice: Slice) {
    let sc_0 = slice;
    if (sc_0.loadUint(32) !== 2077863156) { throw Error('Invalid prefix'); }
    let _user = sc_0.loadAddress();
    let _amount = sc_0.loadIntBig(257);
    let _betContract = sc_0.loadAddress();
    let sc_1 = sc_0.loadRef().beginParse();
    let _outcome = sc_1.loadIntBig(257);
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

 type TestContract_init_args = {
    $$type: 'TestContract_init_args';
    seqno: bigint;
}

function initTestContract_init_args(src: TestContract_init_args) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeInt(src.seqno, 257);
    };
}

async function TestContract_init(seqno: bigint) {
    const __code = Cell.fromBase64('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');
    const __system = Cell.fromBase64('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');
    let builder = beginCell();
    builder.storeRef(__system);
    builder.storeUint(0, 1);
    initTestContract_init_args({ $$type: 'TestContract_init_args', seqno })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

const TestContract_errors: { [key: number]: { message: string } } = {
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
    40368: { message: `Contract stopped` },
    44933: { message: `Only the admin can finalize` },
    53296: { message: `Contract not stopped` },
    63076: { message: `Betting is over` },
}

const TestContract_types: ABIType[] = [
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
    {"name":"BetInfo","header":null,"fields":[{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"source","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_a_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_b_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}},{"name":"odds_a","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"odds_b","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"finishDate","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"total_bet_a","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"total_bet_b","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"BetDetails","header":null,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"betContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"BetArray","header":null,"fields":[{"name":"map","type":{"kind":"dict","key":"int","value":"BetDetails","valueFormat":"ref"}},{"name":"length","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"BetDetailsMessage","header":2077863156,"fields":[{"name":"user","type":{"kind":"simple","type":"address","optional":false}},{"name":"amount","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"betContract","type":{"kind":"simple","type":"address","optional":false}},{"name":"outcome","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"Finalize","header":3527127190,"fields":[{"name":"outcome_a_wins","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BetInfoInit","header":2955413279,"fields":[{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"source","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_a_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_b_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}}]},
]

const TestContract_getters: ABIGetter[] = [
    {"name":"payoutStatus","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"getTodoParentAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getTotalBetA","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getTotalBetB","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getoddA","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getoddB","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"outcome","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"getBetInfo","arguments":[],"returnType":{"kind":"simple","type":"BetInfo","optional":false}},
    {"name":"getMap","arguments":[],"returnType":{"kind":"dict","key":"address","value":"int"}},
    {"name":"getBet","arguments":[{"name":"address","type":{"kind":"simple","type":"address","optional":false}}],"returnType":{"kind":"simple","type":"int","optional":true,"format":257}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

const TestContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"BetInfoInit"}},
    {"receiver":"internal","message":{"kind":"text","text":"1"}},
    {"receiver":"internal","message":{"kind":"text","text":"2"}},
    {"receiver":"internal","message":{"kind":"text","text":"PayA"}},
    {"receiver":"internal","message":{"kind":"text","text":"PayB"}},
    {"receiver":"internal","message":{"kind":"text"}},
    {"receiver":"internal","message":{"kind":"text","text":"chargeback"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
    {"receiver":"internal","message":{"kind":"text","text":"Stop"}},
]

export class TestContract implements Contract {
    
    static async init(seqno: bigint) {
        return await TestContract_init(seqno);
    }
    
    static async fromInit(seqno: bigint) {
        const init = await TestContract_init(seqno);
        const address = contractAddress(0, init);
        return new TestContract(address, init);
    }
    
    static fromAddress(address: Address) {
        return new TestContract(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  TestContract_types,
        getters: TestContract_getters,
        receivers: TestContract_receivers,
        errors: TestContract_errors,
    };
    
    private constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: BetInfoInit | '1' | '2' | 'PayA' | 'PayB' | string | 'chargeback' | Deploy | 'Stop') {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BetInfoInit') {
            body = beginCell().store(storeBetInfoInit(message)).endCell();
        }
        if (message === '1') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === '2') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'PayA') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'PayB') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'chargeback') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (message === 'Stop') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getPayoutStatus(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('payoutStatus', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getGetTodoParentAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getTodoParentAddress', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getGetTotalBetA(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getTotalBetA', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetTotalBetB(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getTotalBetB', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetoddA(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getoddA', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getGetoddB(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getoddB', builder.build())).stack;
        let result = source.readBigNumber();
        return result;
    }
    
    async getOutcome(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('outcome', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
    async getGetBetInfo(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getBetInfo', builder.build())).stack;
        const result = loadTupleBetInfo(source);
        return result;
    }
    
    async getGetMap(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getMap', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
        return result;
    }
    
    async getGetBet(provider: ContractProvider, address: Address) {
        let builder = new TupleBuilder();
        builder.writeAddress(address);
        let source = (await provider.get('getBet', builder.build())).stack;
        let result = source.readBigNumberOpt();
        return result;
    }
    
    async getOwner(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('owner', builder.build())).stack;
        let result = source.readAddress();
        return result;
    }
    
    async getStopped(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('stopped', builder.build())).stack;
        let result = source.readBoolean();
        return result;
    }
    
}