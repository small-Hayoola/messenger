const ws = new WebSocket('ws://localhost:8080');
const interface = new Interface();

function sendMessage(message, givenChannel) {
    ws.send(JSON.stringify({ action: 'message', channel: givenChannel, data: message }));
}

ws.onopen = () => {
    console.log("Established ")
    const loading = document.getElementById('loading');
    loading.textContent = 'Connected!';

    const joinButton = document.getElementById("join");
    const sendButton = document.getElementById("message-send");

    joinButton.addEventListener('click', () => {
        const channel = document.getElementById('channel').value;
        ws.send(JSON.stringify({ action: 'join', channel }));
        interface.displayJoin(channel);
    });

    sendButton.addEventListener('click', () => {
        const channel = document.getElementById('channel').value;
        const message = document.getElementById('message-value').value;
        interface.displayMessage(message);
        sendMessage(message, channel);
    });
    
};  

ws.onmessage = (event) => {
    const message = JSON.parse(event.data);
    interface.displayMessage(message.data);
};
