const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];

io.on('connection', (socket) => {
  console.log('A user has connected!');
  console.log('These are the connected sockets: ', Object.keys(socket.nsp.connected));
  console.log('Just entered socket id: ', socket.id);

  users.push(socket);

  if (users.length) {
    io.emit('gameStarts', 'GAME STARTS!');
  }

  socket.on('changeHP', (data) => {
    io.emit('loadHP', data);
  });

  socket.on('changeVP', (data) => {
    io.emit('loadVP', data);
  });

  socket.on('changeMoney', (data) => {
    io.emit('loadMoney', data);
  });

  socket.on('nextTurn', (data) => {
    io.emit('nextTurn', data);
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected...');
    const i = users.indexOf(socket);
    users.splice(i, 1);
  });
});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));

const port = process.env.PORT || 8000;
server.listen(port);
console.log('Server is running on ' + port);

module.exports = app;
