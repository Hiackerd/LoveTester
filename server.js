const http = require('http');
const WebSocket = require('ws');

const server = http.createServer();
const wss = new WebSocket.Server({ server });

wss.on('connection', ws => {
  console.log('Spieler verbunden');
  ws.on('message', msg => {
    // Broadcast an alle Spieler
    wss.clients.forEach(c => {
      if(c.readyState === WebSocket.OPEN) c.send(msg);
    });
  });
  ws.on('close', () => console.log('Spieler getrennt'));
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server läuft auf Port ${PORT}`));
