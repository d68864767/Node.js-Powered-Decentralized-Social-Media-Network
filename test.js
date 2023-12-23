```javascript
const assert = require('assert');
const { Blockchain, Transaction, Block } = require('./blockchain.js');
const P2PService = require('./p2p.js');
const AIModeration = require('./ai_moderation.js');
const AIPersonalization = require('./ai_personalization.js');
const Cryptocurrency = require('./cryptocurrency.js');
const Wallet = require('./wallet.js');

describe('Blockchain', () => {
    let blockchain, transaction, block;

    beforeEach(() => {
        blockchain = new Blockchain();
        transaction = new Transaction('address1', 'address2', 100);
        block = new Block(Date.now(), [transaction], '0');
    });

    it('should add new block', () => {
        blockchain.addBlock(block);
        assert.equal(blockchain.getLatestBlock(), block);
    });

    it('should validate a valid chain', () => {
        blockchain.addBlock(block);
        assert(blockchain.isChainValid());
    });

    it('should invalidate a chain with a tampered block', () => {
        blockchain.addBlock(block);
        block.transactions[0].amount = 200;
        assert(!blockchain.isChainValid());
    });
});

describe('P2PService', () => {
    // Test cases for P2PService would go here
    // Due to the nature of P2PService, these tests would likely need to be integration tests
    // which would require a more complex setup
});

describe('AIModeration', () => {
    let aiModeration;

    beforeEach(() => {
        aiModeration = new AIModeration();
    });

    it('should classify content as appropriate', () => {
        assert.equal(aiModeration.classifyContent('This is good content'), 'appropriate');
    });

    it('should classify content as inappropriate', () => {
        assert.equal(aiModeration.classifyContent('This is inappropriate content'), 'inappropriate');
    });
});

describe('AIPersonalization', () => {
    let aiPersonalization;

    beforeEach(() => {
        aiPersonalization = new AIPersonalization();
    });

    it('should update user preferences', () => {
        aiPersonalization.updatePreferences('user1', 'I love programming');
        assert.deepEqual(aiPersonalization.userPreferences['user1'], ['programming', 'love']);
    });
});

describe('Cryptocurrency', () => {
    let cryptocurrency;

    beforeEach(() => {
        cryptocurrency = new Cryptocurrency();
    });

    it('should create a new transaction', () => {
        const transaction = cryptocurrency.createTransaction('address1', 'address2', 100);
        assert.equal(transaction.fromAddress, 'address1');
        assert.equal(transaction.toAddress, 'address2');
        assert.equal(transaction.amount, 100);
    });
});

describe('Wallet', () => {
    let wallet;

    beforeEach(() => {
        wallet = new Wallet();
    });

    it('should generate a public key', () => {
        assert(wallet.keyPair.getPublic('hex'));
    });

    it('should generate a private key', () => {
        assert(wallet.keyPair.getPrivate('hex'));
    });
});
```
