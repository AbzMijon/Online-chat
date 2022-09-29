const ws = require('ws');

const wss = new ws.Server({
    port: 5000,
}, () => {
    console.log('Server started in 5000 port server');
})

wss.on('connection', function connection(ws) {
    ws.on('message', function (message) {
        message = JSON.parse(message);
        switch(message.event) {
            case 'connection':
                globalMessage(message);
                break;
            case 'message':
                globalMessage(message);
                break;
        }
    })
})

function globalMessage(message) {
    wss.clients.forEach(client => {
        client.send(JSON.stringify(message));
    })
}