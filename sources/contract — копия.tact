contract TestContract with Deployable, Ownable, Stoppable {
    owner: Address;
    stopped: Bool;
    data: Data;
    seqno: Int as uint64;

    init(seqno: Int) {
        self.owner = sender();
        self.stopped = false;
        self.seqno = seqno;
        self.data = Data{
            total_bet_a: 0,
            total_bet_b: 0,
            odds_a: 1000,
            odds_b: 1000,
            bets_a: emptyMap(),
            bets_b: emptyMap(),
            finalized: false,
            outcome_a_wins: false,
            insufficient_balance: false
        };
    }

    receive("identify") {
        dump(self.seqno);
    }

    receive("deploy") {
        // Initialize StateInit for TestContract
    let init: StateInit = initOf TestContract(2);
    let address: Address = contractAddress(init);
    send(SendParameters{
        to: address,
        value: ton("0.1"),
        mode: SendIgnoreErrors,
        code: init.code,
        data: init.data,
        body: "Initial deployment".asComment()
        });
        dump(address);
    }
}