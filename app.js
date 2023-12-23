```javascript
const express = require('express');
const bodyParser = require('body-parser');
const Blockchain = require('./blockchain.js');
const P2PService = require('./p2p.js');
const AIModeration = require('./ai_moderation.js');
const AIPersonalization = require('./ai_personalization.js');
const Cryptocurrency = require('./cryptocurrency.js');
const Wallet = require('./wallet.js');

const app = express();
app.use(bodyParser.json());

const blockchain = new Blockchain();
const p2pService = new P2PService(blockchain);
const aiModeration = new AIModeration();
const aiPersonalization = new AIPersonalization();
const cryptocurrency = new Cryptocurrency();
const wallet = new Wallet();

// Start the cryptocurrency system
cryptocurrency.start(5001, []);

app.get('/blockchain', (req, res) => {
    res.send(cryptocurrency.blockchain);
});

app.post('/transaction', (req, res) => {
    const { fromAddress, toAddress, amount } = req.body;
    const transaction = cryptocurrency.createTransaction(fromAddress, toAddress, amount);
    res.send(transaction);
});

app.post('/content', (req, res) => {
    const { userId, content } = req.body;

    // Check if content is appropriate
    if (!aiModeration.isContentAppropriate(content)) {
        return res.status(400).send('Inappropriate content');
    }

    // Update user preferences based on content
    aiPersonalization.updatePreferences(userId, content);

    res.send('Content posted successfully');
});

app.get('/content/:userId', (req, res) => {
    const { userId } = req.params;

    // Generate personalized content for user
    const content = aiPersonalization.generateContent(userId);

    res.send(content);
});

app.listen(3000, () => console.log('Server running on port 3000'));
```
