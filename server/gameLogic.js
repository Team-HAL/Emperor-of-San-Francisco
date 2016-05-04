const users = [];
const victoryPoints = [0, 0, 0, 0];
const healthPoints = [10, 10, 10, 10];
const energy = [0, 0, 0, 0];
let currentTurn = 0;
const cards = ['acid spray', 'wood armor', 'energy sword'];
let discardPile = [];

// -1 -> No one in city.
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

  socket.on('leaveTokyo', (data) => {
    if (currentEmperor === data) { // Cheat check
      currentEmperor = -1; // City is vacated
    }
    socket.emit('stayOrLeave', false)
    io.emit('updateEmperor', currentEmperor);
  });

  socket.on('attackOne', (data) => {
    // From data we have data.damage and data.currentUser
    healthPoints[currentEmperor] = healthPoints[currentEmperor] - data.damage;
    io.emit('updateHP', healthPoints);

    // Display option for the current emperor to leave San Francisco
    users[currentEmperor].emit('stayOrLeave', true);
  });

  socket.on('attackAll', (data) => {
    // From data we have data.damage, data.otherPlayers, and data.currentUser
    data.otherPlayers.forEach((item) => {
      healthPoints[item] = healthPoints[item] - data.damage;
    });
    io.emit('updateHP', healthPoints);
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
    victoryPoints[users.indexOf(socket)] += data;
    io.emit('updateVP', victoryPoints);
  });

  socket.on('disconnect', () => {
    console.log('A user has disconnected...');
    const i = users.indexOf(socket);
    users.splice(i, 1);
    io.emit('loadUsers', Object.keys(users));
  });
});