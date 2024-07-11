import "@stdlib/deploy";
import "@stdlib/ownable";
import "@stdlib/stoppable";

struct Bet {
    address: Address;
    amount: Int as uint32;
}

struct Data {
    total_bet_a: Int as uint64;
    total_bet_b: Int as uint64;
    odds_a: Int as uint64;
    odds_b: Int as uint64;
    bets_a: map<Address, Int>;
    bets_b: map<Address, Int>;
    bets_total: map<Address, Int>;
    finalized: Bool;
    outcome_a_wins: Bool;
    insufficient_balance: Bool;
}

struct BetInfo {
    title: String;
    source: String;
    bet_a_name: String;
    bet_b_name: String;
    image: String;
    odds_a: Int as uint64;
    odds_b: Int as uint64;
    finishDate: Int as uint32;
    total_bet_a: Int as uint64;
    total_bet_b: Int as uint64;

}

message Finalize {
    outcome_a_wins: Bool;
}

message BetInfoInit {
    title: String;
    source: String;
    bet_a_name: String;
    bet_b_name: String;
    image: String;
}

contract TestContract with Deployable, Ownable, Stoppable {
    owner: Address;
    admin: Address;
    stopped: Bool;
    data: Data;
    seqno: Int as uint64;
    betInfoData: BetInfo;

    init(seqno: Int) {
        self.owner = sender();
        self.stopped = false;
        self.seqno = seqno;
        self.admin = address("0QDoKkeydaB-dQV2eqgch6ZzT70MoBvQC8GC0Jk7mj2rcsMh");
        self.data = Data{
            total_bet_a: 0,
            total_bet_b: 0,
            odds_a: 1000,
            odds_b: 1000,
            bets_a: emptyMap(),
            bets_b: emptyMap(),
            bets_total: emptyMap(),
            finalized: false,
            outcome_a_wins: false,
            insufficient_balance: false
        };
        self.betInfoData = BetInfo{
        title: "",
        source: "",
        bet_a_name: "",
        bet_b_name: "",
        image: "",
        finishDate: 0,
        odds_a: self.data.odds_a,
        odds_b: self.data.odds_b,
        total_bet_a: 0,
        total_bet_b: 0
    };
    }

    receive(msg: BetInfoInit) {
    require(self.betInfoData.bet_a_name == "" && self.betInfoData.bet_b_name == "" && self.betInfoData.image == "" && self.betInfoData.title == "" && self.betInfoData.source == "", "Already initialized");
    self.betInfoData = BetInfo{
        title: msg.title,
        source: msg.source,
        bet_a_name: msg.bet_a_name,
        bet_b_name: msg.bet_b_name,
        image: msg.image,
        odds_a: self.data.odds_a,
        odds_b: self.data.odds_b,
        finishDate: self.betInfoData.finishDate,
        total_bet_a: self.data.total_bet_a,
        total_bet_b: self.data.total_bet_b
    };
    }

    receive("1") {
        require(!self.data.finalized, "Betting is over");
        let bet_amount: Int = context().value;
        let sender_address: Address = sender();
        self.handle_bet(true, bet_amount);
    }

    receive("2") {
        require(!self.data.finalized, "Betting is over");
        let bet_amount: Int = context().value;
        let sender_address: Address = sender();
        self.handle_bet(false, bet_amount);
    }

    receive("PayA") {
        require(sender() == self.admin, "Only the admin can finalize");
        self.data.outcome_a_wins = true;
        self.data.finalized = true;
        self.payout(self.data.bets_a, self.data.odds_a);
    }

      receive("PayB") {
        require(sender() == self.admin, "Only the admin can finalize");
        self.data.finalized = true;
        self.payout(self.data.bets_b, self.data.odds_b);
    }

    fun handle_bet(bet_on_a: Bool, bet_amount: Int) {
    require(!self.data.finalized, "Betting is over");

    let sender_address: Address = sender();
    let fixed_gas_fee: Int = ton("0.03"); // Fixed gas fee per bet
    let net_bet_amount: Int = bet_amount - fixed_gas_fee; // Deduct the fixed fee

    require(net_bet_amount > 0, "Bet amount must be greater than the fixed fee");

    if (bet_on_a) {
        self.data.total_bet_a += net_bet_amount;
        let current_bet: Int? = self.data.bets_a.get(sender_address);
        let final_bet: Int = current_bet != null ? current_bet!! + net_bet_amount : net_bet_amount;
        self.data.bets_a.set(sender_address, final_bet);
        self.data.bets_total.set(sender_address, final_bet);
    } else {
        self.data.total_bet_b += net_bet_amount;
        let current_bet_b: Int? = self.data.bets_b.get(sender_address);
        let final_bet_b: Int = current_bet_b != null ? current_bet_b!! + net_bet_amount : net_bet_amount;
        self.data.bets_b.set(sender_address, final_bet_b);
        self.data.bets_total.set(sender_address, final_bet_b);
    }

    // Calculate odds
    if (self.data.total_bet_a > 0) {
        self.data.odds_a = ((self.data.total_bet_b * 1000) / self.data.total_bet_a) * 90 / 100;
    } else {
        self.data.odds_a = 1000; // Default odds if no bets on B
    }

    if (self.data.total_bet_b > 0) {
        self.data.odds_b = ((self.data.total_bet_a * 1000) / self.data.total_bet_b) * 90 / 100;
    } else {
        self.data.odds_b = 1000; // Default odds if no bets on A
    }

    self.betInfoData.odds_a = self.data.odds_a;
    self.betInfoData.odds_b = self.data.odds_b;
}

    receive(msg: Finalize) {
        require(sender() == self.admin, "Only the admin can finalize");
        self.data.finalized = true;
        self.betInfoData.finishDate = now();
        self.data.outcome_a_wins = msg.outcome_a_wins;
    }

    receive(msg: String) { 
        require(sender() == self.admin, "Only the admin can finalize");
        if (msg == "finalize_true") {
            self.data.outcome_a_wins = true;
            self.data.finalized = true;
        } else if (msg == "PayA") {
            self.data.outcome_a_wins = true;
            self.data.finalized = true;
            self.payout(self.data.bets_a, self.data.odds_a);
        } else if (msg == "PayB") {
            self.data.finalized = true;
            self.payout(self.data.bets_b, self.data.odds_b);
        } else {
            dump("Invalid message received");
        }
    }
    
    fun payout(bets: map<Address, Int>, odds: Int) {
        let fixed_gas_fee: Int = ton("0.05");
        foreach (address, bet_amount in bets) { 
            if (self.data.outcome_a_wins) {
                let payout_amount: Int = (bet_amount * odds) / 1000 + bet_amount;
                send(SendParameters{
                    to: address,
                    value: payout_amount,
                    mode: SendRemainingValue + SendPayGasSeparately + SendIgnoreErrors
                });
            } 
            else {
                let payout_amount: Int = (bet_amount * odds) / 1000 + bet_amount;
                send(SendParameters{
                    to: address,
                    value: payout_amount,
                    mode: SendRemainingValue + SendPayGasSeparately + SendIgnoreErrors
                });
            }     
        }
        self.sendRemainingBalanceToOwner();
        self.data.finalized = true;
        self.betInfoData.finishDate = now();
    }

    receive("chargeback") {
        require(sender() == self.admin, "Only the admin can finalize");
        self.chargeback(self.data.bets_total);
    }

    fun chargeback(bets: map<Address, Int>) {
    foreach (address, bet_amount in bets) {
        if (bet_amount != null) {
            let refund_amount: Int = bet_amount;
            send(SendParameters{
                to: address,
                value: refund_amount,
                mode: SendRemainingValue + SendPayGasSeparately + SendIgnoreErrors
            });
        }
    }
    self.data.finalized = true;
    self.betInfoData.finishDate = now();
}   
    fun sendRemainingBalanceToOwner() {
    send(SendParameters{
        to: self.owner,
        value: 0,
        mode: SendRemainingBalance 
    });
}

    get fun payoutStatus(): Bool {
        return self.data.insufficient_balance;
    }

    get fun getTotalBetA(): Int {
        return self.data.total_bet_a;
    }

    get fun getTotalBetB(): Int {
        return self.data.total_bet_b;
    }

    get fun getBalance(): Int {
        return myBalance();  
    }

    get fun getoddA(): Int {
        return self.data.odds_a;
    }

    get fun getoddB(): Int {
        return self.data.odds_b;
    }

    get fun outcome(): Bool {
        return self.data.outcome_a_wins;
    }

    get fun finalize(): Bool {
        return self.data.finalized;
    }

    get fun getBetInfo(): BetInfo {
        return self.betInfoData;
    }

    get fun getMap(): map<Address, Int>{
        return self.data.bets_total;
    }
}

contract TodoParent with Deployable {
    owner: Address;
    numChildren: Int as uint64;
    BetList: map<Int, Address>;

    init() {
        self.numChildren = 0;
        self.BetList = emptyMap();
        self.owner = sender();

    }    

     receive() {
    }

    receive("withdraw") {
        self.withdraw();
   }

  fun withdraw() {
    send(SendParameters{
        to: self.owner,
        value: 0,
        mode: SendRemainingBalance 
    });
}


    receive(msg: BetInfoInit) {
        self.numChildren = self.numChildren + 1;
        let init: StateInit = initOf TestContract(self.numChildren);
        let childAddress: Address = contractAddress(init);
        send(SendParameters{
            to: contractAddress(init),
            value: ton("0.1"),              // pay for message, the deployment and give some TON for storage
            mode: SendIgnoreErrors,
            code: init.code,                // attaching the state init will cause the message to deploy
            data: init.data,
            body: msg.toCell()              // sending the BetInfoInit message
        });
        self.BetList.set(self.numChildren, childAddress);
    }


    get fun numChildren(): Int {
        return self.numChildren;
    }

    get fun getAllAddresses(): map<Int, Address> {
        return self.BetList;
    }
}
