```javascript
const { Blockchain, Transaction } = require('./blockchain.js');
const P2PService = require('./p2p.js');

class Cryptocurrency {
    constructor() {
        this.blockchain = new Blockchain();
        this.p2pService = new P2PService(this.blockchain);
    }

    // Start the cryptocurrency system
    start(port, peers) {
        this.p2pService.initP2PServer(port);
        this.p2pService.connectToPeers(peers);
    }

    // Create a new transaction
    createTransaction(fromAddress, toAddress, amount) {
        const transaction = new Transaction(fromAddress, toAddress, amount);
        this.blockchain.createTransaction(transaction);
        this.p2pService.broadcastTransaction(transaction);
    }

    // Mine pending transactions
    minePendingTransactions(miningRewardAddress) {
        this.blockchain.minePendingTransactions(miningRewardAddress);
        this.p2pService.syncChains();
    }

    // Get balance of an address
    getBalanceOfAddress(address) {
        return this.blockchain.getBalanceOfAddress(address);
    }

    // Check if the blockchain is valid
    isChainValid() {
        return this.blockchain.isChainValid();
    }
}

module.exports = Cryptocurrency;
```
