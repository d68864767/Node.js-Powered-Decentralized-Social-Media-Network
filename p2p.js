```javascript
const WebSocket = require('ws');
const { Blockchain, Transaction } = require('./blockchain.js');

class P2PService {
    constructor(blockchain) {
        this.blockchain = blockchain;
        this.sockets = [];
    }

    // Initialize the P2P server and listen for incoming connections
    initP2PServer(port) {
        const server = new WebSocket.Server({ port });
        server.on('connection', (socket) => this.connectSocket(socket));
        console.log(`Listening for peer-to-peer connections on: ${port}`);
    }

    // Connect to peers
    connectToPeers(peers) {
        peers.forEach((peer) => {
            const socket = new WebSocket(peer);
            socket.on('open', () => this.connectSocket(socket));
        });
    }

    // Handle connection
    connectSocket(socket) {
        this.sockets.push(socket);
        this.handleMessage(socket);
        this.sendBlockchain(socket);
    }

    // Handle incoming messages
    handleMessage(socket) {
        socket.on('message', (message) => {
            const data = JSON.parse(message);
            this.blockchain.replaceChain(data);
        });
    }

    // Send the blockchain to a socket
    sendBlockchain(socket) {
        socket.send(JSON.stringify(this.blockchain.chain));
    }

    // Sync chains across all peers
    syncChains() {
        this.sockets.forEach((socket) => this.sendBlockchain(socket));
    }

    // Broadcast transaction to all peers
    broadcastTransaction(transaction) {
        this.sockets.forEach((socket) => socket.send(JSON.stringify(transaction)));
    }

    // Broadcast mined block to all peers
    broadcastMinedBlock(block) {
        this.sockets.forEach((socket) => socket.send(JSON.stringify(block)));
    }
}

module.exports = P2PService;
```
