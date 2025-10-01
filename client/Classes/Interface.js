class Interface {
    constructor(channel) {
        
    }

    displayJoin(channel) {
        
        const element = document.getElementById('messages'); 
        var text = document.createElement('p');
        text.textContent = `jouned to ${channel}!`;
        element.appendChild(text);
    }

    displayMessage(message) {
        console.log(message)
        const element = document.getElementById('messages'); 
        var text = document.createElement('p');
        text.textContent = message;
        element.appendChild(text);
    }
}