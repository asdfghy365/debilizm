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
    finalized: boolean;
    outcome_a_wins: boolean;
    insufficient_balance: boolean;
}

export function storeData(src: Data) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeUint(src.total_bet_a, 32);
        b_0.storeUint(src.total_bet_b, 32);
        b_0.storeUint(src.odds_a, 32);
        b_0.storeUint(src.odds_b, 32);
        b_0.storeDict(src.bets_a, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeDict(src.bets_b, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257));
        b_0.storeBit(src.finalized);
        b_0.storeBit(src.outcome_a_wins);
        b_0.storeBit(src.insufficient_balance);
    };
}

export function loadData(slice: Slice) {
    let sc_0 = slice;
    let _total_bet_a = sc_0.loadUintBig(32);
    let _total_bet_b = sc_0.loadUintBig(32);
    let _odds_a = sc_0.loadUintBig(32);
    let _odds_b = sc_0.loadUintBig(32);
    let _bets_a = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _bets_b = Dictionary.load(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), sc_0);
    let _finalized = sc_0.loadBit();
    let _outcome_a_wins = sc_0.loadBit();
    let _insufficient_balance = sc_0.loadBit();
    return { $$type: 'Data' as const, total_bet_a: _total_bet_a, total_bet_b: _total_bet_b, odds_a: _odds_a, odds_b: _odds_b, bets_a: _bets_a, bets_b: _bets_b, finalized: _finalized, outcome_a_wins: _outcome_a_wins, insufficient_balance: _insufficient_balance };
}

function loadTupleData(source: TupleReader) {
    let _total_bet_a = source.readBigNumber();
    let _total_bet_b = source.readBigNumber();
    let _odds_a = source.readBigNumber();
    let _odds_b = source.readBigNumber();
    let _bets_a = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _bets_b = Dictionary.loadDirect(Dictionary.Keys.Address(), Dictionary.Values.BigInt(257), source.readCellOpt());
    let _finalized = source.readBoolean();
    let _outcome_a_wins = source.readBoolean();
    let _insufficient_balance = source.readBoolean();
    return { $$type: 'Data' as const, total_bet_a: _total_bet_a, total_bet_b: _total_bet_b, odds_a: _odds_a, odds_b: _odds_b, bets_a: _bets_a, bets_b: _bets_b, finalized: _finalized, outcome_a_wins: _outcome_a_wins, insufficient_balance: _insufficient_balance };
}

function storeTupleData(source: Data) {
    let builder = new TupleBuilder();
    builder.writeNumber(source.total_bet_a);
    builder.writeNumber(source.total_bet_b);
    builder.writeNumber(source.odds_a);
    builder.writeNumber(source.odds_b);
    builder.writeCell(source.bets_a.size > 0 ? beginCell().storeDictDirect(source.bets_a, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
    builder.writeCell(source.bets_b.size > 0 ? beginCell().storeDictDirect(source.bets_b, Dictionary.Keys.Address(), Dictionary.Values.BigInt(257)).endCell() : null);
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
        b_1.storeUint(src.odds_a, 32);
        b_1.storeUint(src.odds_b, 32);
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
    let _odds_a = sc_1.loadUintBig(32);
    let _odds_b = sc_1.loadUintBig(32);
    return { $$type: 'BetInfo' as const, title: _title, source: _source, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image, odds_a: _odds_a, odds_b: _odds_b };
}

function loadTupleBetInfo(source: TupleReader) {
    let _title = source.readString();
    let _source = source.readString();
    let _bet_a_name = source.readString();
    let _bet_b_name = source.readString();
    let _image = source.readString();
    let _odds_a = source.readBigNumber();
    let _odds_b = source.readBigNumber();
    return { $$type: 'BetInfo' as const, title: _title, source: _source, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image, odds_a: _odds_a, odds_b: _odds_b };
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
    const __code = Cell.fromBase64('te6ccgECGQEAA+UAART/APSkE/S88sgLAQIBYgIDApzQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZAss/9ADJ7VQWBAIBWA0OAq4BkjB/4HAh10nCH5UwINcLH94gghCwKAcfuo6vMNMfAYIQsCgHH7ry4IHUAdAB1AHQAdQB0AHUAdDUAdAB1DDQECUQJBAjbBXbPH/gghCUapi2uuMCMHAFBgK+BqT4QyHbPFxwWchwAcsBcwHLAXABywASzMzJ+QDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiBiBAQFSQiBulTBZ9FowlEEz9BTiUxcHCAFO0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/CgBoAdD0BDBtAYIA9l4BgBD0D2+h8uCHAYIA9l4iAoAQ9BfIAcj0AMkBzHABygBYAYEBAc8AyQGacFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhHYIIQBfXhAFBlcgsJAZbIVUCCELAoBx9QBssfyFAFzxbJUATMyFADzxbJWMzIWM8WyQHMyMhQA88WyVjMyFADzxbJWMzJAczJEDUQJBA3R2B/BgUEQTPbPAELATptbSJus5lbIG7y0IBvIgGRMuIQJHADBIBCUCPbPAsByshxAcoBUAcBygBwAcoCUAUg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxZQA/oCcAHKaCNus5F/kyRus+KXMzMBcAHKAOMNIW6znH8BygABIG7y0IABzJUxcAHKAOLJAfsADACYfwHKAMhwAcoAcAHKACRus51/AcoABCBu8tCAUATMljQDcAHKAOIkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDicAHKAAJ/AcoAAslYzAIBWA8QAgFIEhMCEbG29s82zxsIYBYRAJWy9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSAAAiACAWIUFQB1sm7jQ1aXBmczovL1FtWUNqQzlrRG5HQjdGZ3FkcWZwa2RGcWZoeGVzdDlpZ0FjNkg3ZXBldWVrb0uCACD6ejtnm2eNhDFhcAD6V92omhpAADAULtRNDUAfhj0gABl9M/9ARZbBLgMPgo1wsKgwm68uCJ2zwYAAIhAARwbQ==');
    const __system = Cell.fromBase64('te6cckECXwEADS0AAQHAAQIBWAIZAQW5pHgDART/APSkE/S88sgLBAIBYgUMApzQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zxa2zzy4ILI+EMBzH8BygBZAss/9ADJ7VQUBgKuAZIwf+BwIddJwh+VMCDXCx/eIIIQsCgHH7qOrzDTHwGCELAoBx+68uCB1AHQAdQB0AHUAdAB1AHQ1AHQAdQw0BAlECQQI2wV2zx/4IIQlGqYtrrjAjBwBwsCvgak+EMh2zxccFnIcAHLAXMBywFwAcsAEszMyfkAyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IgYgQEBUkIgbpUwWfRaMJRBM/QU4lMXCAkAaAHQ9AQwbQGCAPZeAYAQ9A9vofLghwGCAPZeIgKAEPQXyAHI9ADJAcxwAcoAWAGBAQHPAMkBmnBZyHABywFzAcsBcAHLABLMzMn5AMhyAcsBcAHLABLKB8v/ydAg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIR2CCEAX14QBQZXILCgGWyFVAghCwKAcfUAbLH8hQBc8WyVAEzMhQA88WyVjMyFjPFskBzMjIUAPPFslYzMhQA88WyVjMyQHMyRA1ECQQN0dgfwYFBEEz2zwBMwFO0x8BghCUapi2uvLggdM/ATHIAYIQr/kPV1jLH8s/yfhCAXBt2zx/LAIBWA0RAgFYDhACEbG29s82zxsIYBQPAAIgAJWy9GCcFzsPV0srnsehOw51kqFG2aCcJ3WNS0rZHyzItOvLf3xYjmCcCBVwBuAZ2OUzlg6rkclssOCcJ2XTlqzTstzOg6WbZRm6KSACAUgSGAIBYhMXAg+no7Z5tnjYQxQWAULtRNDUAfhj0gABl9M/9ARZbBLgMPgo1wsKgwm68uCJ2zwVAARwbQACIQAPpX3aiaGkAAMAdbJu40NWlwZnM6Ly9RbVlDakM5a0RuR0I3RmdxZHFmcGtkRnFmaHhlc3Q5aWdBYzZIN2VwZXVla29LggAQW7ZegaART/APSkE/S88sgLGwIBYhw4A7LQAdDTAwFxsKMB+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiFRQUwNvBPhhAvhi2zwREhEUERIRERETEREREBESERAPEREPDhEQDhDfVRzbPPLgglodNQL27aLt+wGSMH/gcCHXScIflTAg1wsf3iCCELAoBx+6jqww0x8BghCwKAcfuvLggdQB0AHUAdAB1AHQAdQB0NQB0AHUMNAQJRAkECNsFeAgghDSO7CWuo4kMNMfAYIQ0juwlrry4IHSAAExOjqCAMIU+EJWEwHHBfL0fwp/Hh8AsDU1gQuhiwhQCQH5AQH5AbqbiwhQBwH5AQH5AbqSNnDim4sIUAUB+QEB+QG6kjRw4puLCFAIAfkBAfkBupI3cOKbiwhQBgH5AQH5AbqSNXDiFPL0VBI8LH8CduAgghCUapi2uo6oMNMfAYIQlGqYtrry4IHTPwExyAGCEK/5D1dYyx/LP8n4QgFwbds8f+DAAJEw4w1wLCAD/iD5ASCC8KtUE8S61aiHNlvo+xBbmMniSLX/RMqfM8gB3RHOKdYLuo6XW4IA9mQrs/L0+EFvJBNfA38B2zx/2zHgIILwaXQs/yUfW5SNx2EAtlRFgKr/ilXEYJ8iLvfaNcFUfS26jpdbggD2ZCuz8vT4QW8kE18DcAHbPH/bMeAhISUD8j8/W4IA9mQps/L0+EINjkxR26ApgQELLoEBAUEz9ApvoZQB1wAwkltt4iBus5ggbvLQgFAMoJIwC+IQKYEBC0DdgQEBIW6VW1n0WTCYyAHPAEEz9EHiELwQmwcI4w0pwgCYK4ED6KgqqQSTgQPo4izCAJOBA+jjDVwiIyQAjFHroCqBAQsugQEBQTP0Cm+hlAHXADCSW23iIG6zmCBu8tCAUAygkjAL4hAqgQELQN2BAQEhbpVbWfRZMJjIAc8AQTP0QeIAECqBA+ioLakEABQNERANED4QLRBMA/AggvCPYDPc2us6TJjt3vNutWFGn6+BoGq3jgSUK0dzqKM95bqOlVuBESz4QlYUAccF8vRTzts8MH/bMeAggvCoz/aggrX3SUWXQWl05+hvskLYGQHapVsAZqfQHWrFiLqOlVuBESz4QlYUAccF8vRTzts8MH/bMeAvLyYCaILwvPr3dpB8cZzI03nY8ZSqqifoyihxzVkXgXIfIVpFRQG6joYw2zx/2zHgINdJwh/jAjAnLQQY2zzbPFcRf4gBERIBKCkqKwAU+EJWEwHHBfLghAASggCdsFYSs/L0ABYAAAAAU3RvcHBlZAEO+EIBf23bPCwBOm1tIm6zmVsgbvLQgG8iAZEy4hAkcAMEgEJQI9s8MwLmgCDXIYIAwhT4QlYVAccF8vSL1maW5hbGl6ZV90cnVlghAfkBAfkBupUwOTl/f488i0UGF5QYIQH5AQH5AbqOjjA5OX9/VDrsEDtDANs8jpiLRQYXlCgBAfkBAfkBuo6HOn9UOr3bPN7iUJkK4lCqCX/bMS4uA/YREhEUERIRERETEREREBEUERAPERMPDhEUDg0REw0MERQMCxETCwoRFAoJERMJCBEUCAcREwcGERQGBRETBQQRFAQDERMDAhEUAgEREwERFFYTVhXbPPgnbxABueMCVhOBAQuBAQFZ9IJvpSCWUCPXADBYlmwhbTJtAeIvMDEArnAigQELgQEBWfSCb6UgllAj1wAwWJZsIW0ybQHikI4yIG6znVMDqIED6KkEAaASoAGRMOKBAQskAoEBAUEz9HRvpSCWUCPXADBYlmwhbTJtAeLoECRfBABCOFcSVxIPEREPDhEQDhDfEM4QvRCsEJsQihB5EGh/CFUVA/SKj18rjp0gVheogQPoqQQBp1qAZKkEoFIQgEJ/VSBtbW3bPI6dIFYXqIED6KkEAadagGSpBKBSEIBCf1UgbW1t2zzigQELVhUCgQEBQTP0dG+lIJZQI9cAMFiWbCFtMm0B4uhbVxNXExEQERIREA8REQ8OERAOEN9VHDIzMwAAAcrIcQHKAVAHAcoAcAHKAlAFINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiM8WUAP6AnABymgjbrORf5MkbrPilzMzAXABygDjDSFus5x/AcoAASBu8tCAAcyVMXABygDiyQH7ADQAmH8BygDIcAHKAHABygAkbrOdfwHKAAQgbvLQgFAEzJY0A3ABygDiJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4nABygACfwHKAALJWMwCwsj4QwHMfwHKABETERIREREQVeABERMBERIg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYBERABygAJEI4QfRBsEFsQSk4TUNzbPBLLP8hGFxA1EDQY2zzJAczJ7VQ2NwAuUInLHxbLHxTLHxLLH/QA9ADKAMoAygAAZshQB88WyVAHzMhQBc8WyVAEzMhQA88WyVjMyMhQA88WyVjMyFADzxbJWMwTyx/LH8kBzAIBIDlKAgEgOj8CAVg7PQIZsF72zzbPFcQXw9sMYFo8AARWEQIZsEY2zzbPFcQXw9sMYFo+AAIqAgEgQEUCAnFBQwIXpju2ebZ4riC+HthjWkIABFYSAhemcbZ5tniuIL4e2GNaRAACLQIBakZIAhSrt9s82zxs52xXWkcADlR2VFR2VCYCGKtb2zzbPFcQXw9sMVpJAAIuAgEgS1ICASBMUQIB601PAhe9PbPNs8VxBfD2wxhaTgAI+CdvEAIXvP2zzbPFcQXw9sMYWlAAAikA3bd6ME4LnYerpZXPY9CdhzrJUKNs0E4TusalpWyPlmRadeW/vixHME4ECrgDcAzscpnLB1XI5LZYcE4TsunLVmnZbmdB0s2yjN0UkE4IGc6tPOK/OkoWA6wtxMj2UE4SJg0M1N0Uhs/cCPfAqjHxMAIBIFNZAgEgVFgCASBVVgARrV92omhpAADAAhmsee2ebZ4riC+HthjAWlcABFYQAHWybuNDVpcGZzOi8vUW1kYUNrMTlpM3RvcDN6SGhYanFmVTJFanJNVUV0bVF3RllrWWE1dVBDOFoxYoIAIZtxIbZ5tniuIL4e2GMFpeA+btRNDUAfhj0gABj1H6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA2zwJ0z/UAdDbPDcHERMHBxESBwcREQcQeFUFVxMRERESEREREBERERAPERAPVQ7g+CjXCwqDCbry4ImBAQHXAAEB0ds8W1xdACjTH9Mf0x/TH/QE9ATSANIA0gBVgABE1AHQAdQB0AHUAdAB1AHQ1AHQAdQB0AHTH9MfMBBHEEYQRQB0+EJwcCCBA+ggbW1wcHCLCIsIiwiLCIsIU7oRERESEREREBERERAPERAPEO8Q3hDNELwQqxCaEIkQeAACL9jryxM=');
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
    4396: { message: `Only for owner` },
    40368: { message: `Contract stopped` },
    49684: { message: `Only the owner can finalize` },
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
    {"name":"Data","header":null,"fields":[{"name":"total_bet_a","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"total_bet_b","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"odds_a","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"odds_b","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"bets_a","type":{"kind":"dict","key":"address","value":"int"}},{"name":"bets_b","type":{"kind":"dict","key":"address","value":"int"}},{"name":"finalized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"outcome_a_wins","type":{"kind":"simple","type":"bool","optional":false}},{"name":"insufficient_balance","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BetInfo","header":null,"fields":[{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"source","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_a_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_b_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}},{"name":"odds_a","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"odds_b","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Finalize","header":3527127190,"fields":[{"name":"outcome_a_wins","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"BetInfoInit","header":2955413279,"fields":[{"name":"title","type":{"kind":"simple","type":"string","optional":false}},{"name":"source","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_a_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_b_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}}]},
]

const TodoParent_getters: ABIGetter[] = [
    {"name":"numChildren","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getAllAddresses","arguments":[],"returnType":{"kind":"dict","key":"int","value":"address"}},
]

const TodoParent_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"BetInfoInit"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: BetInfoInit | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'BetInfoInit') {
            body = beginCell().store(storeBetInfoInit(message)).endCell();
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
    
    async getGetAllAddresses(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getAllAddresses', builder.build())).stack;
        let result = Dictionary.loadDirect(Dictionary.Keys.BigInt(257), Dictionary.Values.Address(), source.readCellOpt());
        return result;
    }
    
}