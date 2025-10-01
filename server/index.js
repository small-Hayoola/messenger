const WebSocket = require('ws');
const server = new WebSocket.Server({ port: 8080 });

const channels = new Map();

server.on('connection', (ws) => {
    console.log("New connection");
    ws.on('message', (message) => {
        const messageObject = JSON.parse(message);
        const { action, channel, data } = messageObject; 

        switch (action) {
            case 'join':
                if(!(channels.has(channel))) { 
                    channels.set(channel, new Set());
                }
                channels.get(channel).add(ws);
                break;
            case 'leave':
                if(channels.has(channel)) {
                    channels.get(channel).delete(ws);
                }
                break;
            case 'message':
                if(channels.has(channel)) {
                    for (const userWs of channels.get(channel)) {
                        if(userWs !== ws && userWs.readyState === WebSocket.OPEN) {
                            userWs.send(JSON.stringify({ channel, data }));
                        }
                    }
                }
                break;
        }
    });
});