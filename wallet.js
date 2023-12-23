```javascript
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const { Transaction } = require('./blockchain.js');
const Cryptocurrency = require('./cryptocurrency.js');

class Wallet {
    constructor() {
        this.keyPair = ec.genKeyPair();
        this.publicKey = this.keyPair.getPublic('hex');
        this.privateKey = this.keyPair.getPrivate('hex');
        this.cryptocurrency = new Cryptocurrency();
    }

    // Create a new transaction
    createTransaction(toAddress, amount) {
        const transaction = new Transaction(this.publicKey, toAddress, amount);
        transaction.signTransaction(this.keyPair);
        this.cryptocurrency.createTransaction(transaction);
    }

    // Get balance of the wallet
    getBalance() {
        return this.cryptocurrency.getBalanceOfAddress(this.publicKey);
    }

    // Mine pending transactions
    minePendingTransactions() {
        this.cryptocurrency.minePendingTransactions(this.publicKey);
    }

    // Check if the blockchain is valid
    isChainValid() {
        return this.cryptocurrency.isChainValid();
    }
}

module.exports = Wallet;
```
