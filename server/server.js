
"use strict";
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

const users = [];
const VP = [0, 0, 0, 0];
const HP = [10, 10, 10, 10];
const energy = [0, 0, 0, 0];
let currentTurn = 0;
const cards = ['acid spray', 'wood armor', 'energy sword'];
let discardPile = [];
let currentEmperor = 0; 

io.on('connection', (socket) => {
  // console.log('A user has connected!');
  // console.log('These are the connected sockets: ', Object.keys(socket.nsp.connected));
  // console.log('Just entered socket id: ', socket.id);

  if (users.length !== 4) {
    users.push(socket);
  }

  socket.on('endTurn', () => {
    currentTurn++;
    if (currentTurn > users.length - 1) {
      currentTurn = 0;
    }
    io.emit('updateTurn', currentTurn);
  })

  socket.emit('getUser', users.indexOf(socket));

  io.emit('loadUsers', Object.keys(users).map((x) => { return parseInt(x, 10); }));


  if (users.length === 4) {
    io.emit('gameStarts', 'GAME STARTS!');
  }

  socket.on('attackOne', (data) => {
    // From data we have data.damage and data.currentUser
    HP[currentEmperor] = HP[currentEmperor] - data.damage;
    io.emit('updateHP', HP);

    // Give an option for the current emperor to leave San Francisco
    users[currentEmperor].emit('stayOrLeave', true);
  });

  socket.on('attackAll', (data) => {
    // From data we have data.damage, data.otherPlayers, and data.currentUser
    data.otherPlayers.forEach((item) => {
      HP[item] = HP[item] - data.damage;
    });
    io.emit('updateHP', HP);
  });

  socket.on('getEnergy', (data) => {
    // Data here would be the amount of energy to be added
    const i = users.indexOf(socket);
    energy[i] = energy[i] + data;

    io.emit('updateEnergy', energy);
  });

  socket.on('getCard', (data) => {
    // data here would be the number of cards you want to get
    const cardsToSend = [];

    for (let i = 0; i < data; i++) {
      cardsToSend.push(cards.splice(Math.floor(Math.random() * cards.length), 1));
    }

    discardPile = discardPile.concat(cardsToSend);
    socket.emit('loadCard', cardsToSend);
  });

  socket.on('changeHP', (data) => {
    io.emit('loadHP', data);
  });

  socket.on('changeVP', (data) => {
    io.emit('loadVP', data);
  });

  socket.on('changeMoney', (data) => {
    io.emit('loadMoney', data);
  });

  socket.on('increaseVP', (data) => {
    VP[users.indexOf(socket)] += data;
    io.emit('updateVP', VP);
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected...');
    const i = users.indexOf(socket);
    users.splice(i, 1);
    io.emit('loadUsers', Object.keys(users));
  });
});


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../'));

const port = process.env.PORT || 8000;
server.listen(port);
console.log('Server is running on ' + port);

module.exports = app;
