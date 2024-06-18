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

export type TrumpBiden = {
    $$type: 'TrumpBiden';
    bet_a_name: string;
    bet_b_name: string;
    image: string;
    odds_a: bigint;
    odds_b: bigint;
}

export function storeTrumpBiden(src: TrumpBiden) {
    return (builder: Builder) => {
        let b_0 = builder;
        b_0.storeStringRefTail(src.bet_a_name);
        b_0.storeStringRefTail(src.bet_b_name);
        b_0.storeStringRefTail(src.image);
        b_0.storeUint(src.odds_a, 32);
        b_0.storeUint(src.odds_b, 32);
    };
}

export function loadTrumpBiden(slice: Slice) {
    let sc_0 = slice;
    let _bet_a_name = sc_0.loadStringRefTail();
    let _bet_b_name = sc_0.loadStringRefTail();
    let _image = sc_0.loadStringRefTail();
    let _odds_a = sc_0.loadUintBig(32);
    let _odds_b = sc_0.loadUintBig(32);
    return { $$type: 'TrumpBiden' as const, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image, odds_a: _odds_a, odds_b: _odds_b };
}

function loadTupleTrumpBiden(source: TupleReader) {
    let _bet_a_name = source.readString();
    let _bet_b_name = source.readString();
    let _image = source.readString();
    let _odds_a = source.readBigNumber();
    let _odds_b = source.readBigNumber();
    return { $$type: 'TrumpBiden' as const, bet_a_name: _bet_a_name, bet_b_name: _bet_b_name, image: _image, odds_a: _odds_a, odds_b: _odds_b };
}

function storeTupleTrumpBiden(source: TrumpBiden) {
    let builder = new TupleBuilder();
    builder.writeString(source.bet_a_name);
    builder.writeString(source.bet_b_name);
    builder.writeString(source.image);
    builder.writeNumber(source.odds_a);
    builder.writeNumber(source.odds_b);
    return builder.build();
}

function dictValueParserTrumpBiden(): DictionaryValue<TrumpBiden> {
    return {
        serialize: (src, buidler) => {
            buidler.storeRef(beginCell().store(storeTrumpBiden(src)).endCell());
        },
        parse: (src) => {
            return loadTrumpBiden(src.loadRef().beginParse());
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
    const __code = Cell.fromBase64('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+gJwAcpoI26zkX+TJG6z4pczMwFwAcoA4w0hbrOcfwHKAAEgbvLQgAHMlTFwAcoA4skB+wAfABQPEREPDhEQDlUdAJh/AcoAyHABygBwAcoAJG6znX8BygAEIG7y0IBQBMyWNANwAcoA4iRus51/AcoABCBu8tCAUATMljQDcAHKAOJwAcoAAn8BygACyVjMAC5QicsfFssfFMsfEssf9AD0AMoAygDKAAACzAIBWCQlAgEgKCkCGbBe9s82zxXEF8PbCGBEJgIZsEY2zzbPFcQXw9sIYEQnAARWEAACKQICcSorAgFYLi8CF6Y7tnm2eK4gvh7YQ0QsAhemcbZ5tniuIL4e2ENELQAEVhEAAiwCGa+t7Z5tniuIL4e2EMBEMAIZrM7tnm2eK4gvh7YQwEQxAAItAAIlAgEgNDUCASA9PgIBbjY3AN23ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lBOEiYNDNTdFIbP3Aj3wKox8TACFKhN2zzbPGz1bDVEOAIBbjk6AApUdDJTQwIXvT2zzbPFcQXw9sIYRDsCF7z9s82zxXEF8PbCGEQ8AAj4J28QAAIoAgEgP0ACGbcSG2ebZ4riC+HthDBERQIBIEFCAHWybuNDVpcGZzOi8vUW1jaXRrYnNEeEZ3SlNpU1FtR3o1NGkzeTM2eldvd0NnSzlLUWJ0bnJRR3lmOYIAARrV92omhpAADAAhmsee2ebZ4riC+HthDAREMAAi8CQu1E0NQB+GPSAAHjAvgo1wsKgwm68uCJgQEB1wABAdHbPEZHAAIuAfr6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdIA2zwJ0z/6QAEg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIAdQB0NQB0AHUAdAB1AHQAdMf0x9VQDUFERIFBRERBQUREAUQVxBWVQNXEhEQEREREA8REA9VDkgB2vhCcHAgyHIBywFwAcsAEsoHy//J0CDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IhwIIED6CBtbXBwcItUJpZG9uiLVUcnVtcIiYED6CAREBERERAPERAPEN8QzhC9EKwQmxCKEHkQaBBXEFZJACjTH9Mf0x/TH/QE9ATSANIA0gBVgAH+aHR0cHM6Ly9zdW45LTQ0LnVzZXJhcGkuY29tL2ltcGcvUkpVSy11Ylh4T3g0WGJFMHE4ZTdjc0RHVnhsc3ljeWVVdDNqQ3cvWmV3OWlXdzAwSGcuanBnP3NpemU9MTI4MHg3ODEmcXVhbGl0eT05NiZzaWduPTU0MmYyNDlmMUoARDk3ZTAwODA4OTYxMzJmNTQwZWYyOGViJnR5cGU9YWxidW0=');
    const __system = Cell.fromBase64('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EREPDhEQDlUdAAJwAvYBERIBEREg10mBAQu68uCIINcLCiCBBP+68tCJgwm68uCIzxYfygAJEI0QfBBrEFoEED1Muts8yz9QAyDXSYEBC7ry4Igg1wsKIIEE/7ry0ImDCbry4IjPFshEZchQBc8WyVAFzMhQA88WyVjMyFjPFskBzBLLH8sfyQEfIAAuUInLHxbLHxTLHxLLH/QA9ADKAMoAygAAAswCASAiMwIBICMoAgFYJCYCGbBe9s82zxXEF8PbCGBGJQAEVhACGbBGNs82zxXEF8PbCGBGJwACKQIBICkuAgJxKiwCF6Y7tnm2eK4gvh7YQ0YrAARWEQIXpnG2ebZ4riC+HthDRi0AAiwCAVgvMQIZr63tnm2eK4gvh7YQwEYwAAItAhmszu2ebZ4riC+HthDARjIAAiUCASA0PgIBIDU9AgFuNjgCFKhN2zzbPGz1bDVGNwAKVHQyU0MCAW45OwIXvT2zzbPFcQXw9sIYRjoACPgnbxACF7z9s82zxXEF8PbCGEY8AAIoAN23ejBOC52Hq6WVz2PQnYc6yVCjbNBOE7rGpaVsj5ZkWnXlv74sRzBOBAq4A3AM7HKZywdVyOS2WHBOE7Lpy1Zp2W5nQdLNsozdFJBOCBnOrTzivzpKFgOsLcTI9lBOEiYNDNTdFIbP3Aj3wKox8TACASA/RQIBIEBEAgEgQUIAEa1fdqJoaQAAwAIZrHntnm2eK4gvh7YQwEZDAAIvAHWybuNDVpcGZzOi8vUW1jaXRrYnNEeEZ3SlNpU1FtR3o1NGkzeTM2eldvd0NnSzlLUWJ0bnJRR3lmOYIAIZtxIbZ5tniuIL4e2EMEZMAkLtRNDUAfhj0gAB4wL4KNcLCoMJuvLgiYEBAdcAAQHR2zxHSQH6+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHSANs8CdM/+kABINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiAHUAdDUAdAB1AHQAdQB0AHTH9MfVUA1BRESBQUREQUFERAFEFcQVlUDVxIREBERERAPERAPVQ5IACjTH9Mf0x/TH/QE9ATSANIA0gBVgAHa+EJwcCDIcgHLAXABywASygfL/8nQINdJgQELuvLgiCDXCwoggQT/uvLQiYMJuvLgiHAggQPoIG1tcHBwi1Qmlkb26ItVRydW1wiJgQPoIBEQEREREA8REA8Q3xDOEL0QrBCbEIoQeRBoEFcQVkoB/mh0dHBzOi8vc3VuOS00NC51c2VyYXBpLmNvbS9pbXBnL1JKVUstdWJYeE94NFhiRTBxOGU3Y3NER1Z4bHN5Y3llVXQzakN3L1pldzlpV3cwMEhnLmpwZz9zaXplPTEyODB4NzgxJnF1YWxpdHk9OTYmc2lnbj01NDJmMjQ5ZjFLAEQ5N2UwMDgwODk2MTMyZjU0MGVmMjhlYiZ0eXBlPWFsYnVtAAIutyX0Lw==');
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
    4396: { message: `Only for owner` },
    40368: { message: `Contract stopped` },
    49684: { message: `Only the owner can finalize` },
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
    {"name":"Data","header":null,"fields":[{"name":"total_bet_a","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"total_bet_b","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"odds_a","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"odds_b","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"bets_a","type":{"kind":"dict","key":"address","value":"int"}},{"name":"bets_b","type":{"kind":"dict","key":"address","value":"int"}},{"name":"finalized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"outcome_a_wins","type":{"kind":"simple","type":"bool","optional":false}},{"name":"insufficient_balance","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"TrumpBiden","header":null,"fields":[{"name":"bet_a_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"bet_b_name","type":{"kind":"simple","type":"string","optional":false}},{"name":"image","type":{"kind":"simple","type":"string","optional":false}},{"name":"odds_a","type":{"kind":"simple","type":"uint","optional":false,"format":32}},{"name":"odds_b","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"Finalize","header":3527127190,"fields":[{"name":"outcome_a_wins","type":{"kind":"simple","type":"bool","optional":false}}]},
]

const TestContract_getters: ABIGetter[] = [
    {"name":"getTrumpBidenData","arguments":[],"returnType":{"kind":"simple","type":"TrumpBiden","optional":false}},
    {"name":"getNewContractAddress","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"getTotalBetA","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getTotalBetB","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getBalance","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getoddA","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"getoddB","arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"outcome","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"finalize","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
    {"name":"owner","arguments":[],"returnType":{"kind":"simple","type":"address","optional":false}},
    {"name":"stopped","arguments":[],"returnType":{"kind":"simple","type":"bool","optional":false}},
]

const TestContract_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"text","text":"identify"}},
    {"receiver":"internal","message":{"kind":"text","text":"zhopa"}},
    {"receiver":"internal","message":{"kind":"text","text":"1"}},
    {"receiver":"internal","message":{"kind":"text","text":"2"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Finalize"}},
    {"receiver":"internal","message":{"kind":"text"}},
    {"receiver":"internal","message":{"kind":"text","text":"CalculateA"}},
    {"receiver":"internal","message":{"kind":"text","text":"CalculateB"}},
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
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: 'identify' | 'zhopa' | '1' | '2' | Finalize | string | 'CalculateA' | 'CalculateB' | Deploy | 'Stop') {
        
        let body: Cell | null = null;
        if (message === 'identify') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'zhopa') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === '1') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === '2') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Finalize') {
            body = beginCell().store(storeFinalize(message)).endCell();
        }
        if (typeof message === 'string') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'CalculateA') {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message === 'CalculateB') {
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
    
    async getGetTrumpBidenData(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getTrumpBidenData', builder.build())).stack;
        const result = loadTupleTrumpBiden(source);
        return result;
    }
    
    async getGetNewContractAddress(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getNewContractAddress', builder.build())).stack;
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
    
    async getGetBalance(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('getBalance', builder.build())).stack;
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
    
    async getFinalize(provider: ContractProvider) {
        let builder = new TupleBuilder();
        let source = (await provider.get('finalize', builder.build())).stack;
        let result = source.readBoolean();
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