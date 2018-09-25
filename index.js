
const PORT = process.env.PORT || 8080;
var fs = require('fs');
var http = require('http');
var server = http.createServer(function(request, response) {
    console.log((new Date()) + ' Server connect on port 12342');
    fs.readFile('index.html', function(error, content) {
                response.writeHead(200);
                response.end(content, 'utf-8');
            });
    
});
server.listen(PORT, function() {
    console.log((new Date()) + ' Server is listening on port 1234');
});

const WebSocket = require('ws');

const wss = new WebSocket.Server({
    server: server,
    path: '/ws' });

function SendAll(data) {
    wss.clients.forEach(function(client) {       
            client.send(data);
    });
}

function SendAll(data) {
    wss.clients.forEach(function(client) {       
            client.send(data);
    });
}
function SendAllBut(data,but) {
    wss.clients.forEach(function(client) {       
           if(client != but) client.send(data);
    });
}

wss.on('connection', function connectionWS(ws) {
    //connection.send('SQT DOLV18\r\n')
    console.log('connect');
 // ws.send('init');
   // SendAll('init2');
  ws.on('message', function incomingWS(message) {
    //console.log('received: %i - %s',message.length, message);
      var data = message;//Buffer.from(message).toString('base64');
      //console.log(data);
      SendAllBut(data,ws);
  });
    ws.on('close', function close() {
    //connection.send('USQ DOLV18\r\n')
  console.log('disconnected');
});

});