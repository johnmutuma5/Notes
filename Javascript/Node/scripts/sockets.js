const net = require('net');

const server = net.createServer();

const activeSockets = {};
let socketId = 0;

server.on('connection', socket => {
  socket.id = socketId++;
  activeSockets[socket.id] = socket;
  socket.write('Hello, welcome!\n');

  socket.on('data', data => {
    Object.entries(activeSockets)
      .forEach(([id, soc]) => {
        return soc.write(`${socket.id}: ${data}`);
      })
  })
});

server.listen(8000, () => console.log('Listenning for connections'));
