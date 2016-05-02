const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
// const webpack = require('webpack');
// const webpackDevMiddleware = require('webpack-dev-middleware');
// const webpackHotMiddleware = require('webpack-hot-middleware');
// const webpackConfig = require('./../webpack.config.js');

const app = express();
// const compiler = webpack(webpackConfig);
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];
const VP = [0,0,0,0];
const cards = ['acid spray', 'wood armor', 'energy sword']
io.on('connection', (socket) => {
  // console.log('A user has connected!');
  // console.log('These are the connected sockets: ', Object.keys(socket.nsp.connected));
  // console.log('Just entered socket id: ', socket.id);

  if (users.length !== 4) {
    users.push(socket);
  }

  // console.log('TEAM THIS IS THE USERS: ', users);

  socket.emit('getUser', users.indexOf(socket));

  io.emit('loadUsers', Object.keys(users));
  // 0, 1, 2, 3

  if (users.length === 4) {
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
  
  socket.on('increaseVP', (data) => {
    VP[users.indexOf(socket)] += data;
    io.emit('updateVP', VP);
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected...');
    io.emit('loadUsers', Object.keys(users));
    const i = users.indexOf(socket);
    users.splice(i, 1);
  });
});


app.use(morgan('dev'));
app.use(bodyParser.json());
// app.use(webpackDevMiddleware(compiler));
// app.use(webpackHotMiddleware(compiler));
app.use(express.static(__dirname + '/../'));

const port = process.env.PORT || 8000;
server.listen(port);
console.log('Server is running on ' + port);

module.exports = app;
