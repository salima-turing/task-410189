const http = require('http');
const url = require('url');
const querystring = require('querystring');
const mapUserIdToSocket = new Map();

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const query = parsedUrl.query;

    switch (path) {
        case '/join':
            handleJoin(req, res, query.userId);
            break;
        case '/sendMessage':
            handleSendMessage(req, res, query.senderId, query.recipientId, query.message);
            break;
        default:
            res.statusCode = 404;
            res.end('Not found');
            break;
    }
});

server.listen(4000, () => {
    console.log('Server running on port 3000');
});

function handleJoin(req, res, userId) {
    // In a real scenario, you would replace this with a WebSocket connection
    // For simplicity, we'll just log the join event
    console.log(`User ${userId} joined`);
    mapUserIdToSocket.set(userId, 'Some Socket for User ' + userId);
    res.end('Joined successfully');
}

function handleSendMessage(req, res, senderId, recipientId, message) {
    if (!mapUserIdToSocket.has(senderId) || !mapUserIdToSocket.has(recipientId)) {
        res.statusCode = 404;
        res.end('User not found');
        return;
    }

    // Simulate sending the message to the recipient's socket
    const recipientSocket = mapUserIdToSocket.get(recipientId);
    console.log(`Sending message from ${senderId} to ${recipientId}: ${message}`);
    // In a real scenario, you would send the message via the recipientSocket

    res.end('Message sent successfully');
}
