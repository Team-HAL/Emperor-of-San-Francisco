const users = [];
const VP = [0, 0, 0, 0];
const HP = [10, 10, 10, 10];
const energy = [0, 0, 0, 0];
let currentTurn = 0;
const cards = ['acid spray', 'wood armor', 'energy sword'];
let discardPile = [];

// -1 -> No one in city.
let currentEmperor = 0;

module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log('A user has connected!');
    // console.log('These are the connected sockets: ', Object.keys(socket.nsp.connected));
    // console.log('Just entered socket id: ', socket.id);

    if (users.length !== 4) {
      users.push(socket);
    }
    
    // Data = Dice Object: {1:2,2:2,3:3,4:0,5:0,6:0}
    //4 = attack
    //5 = energy
    //6 = heart
    //3 '1's = 1 point
    //4 '1's = 2 points
    //5 '1's = 3 points etc..
    socket.on('endTurn', (data) => {
      let player = users.indexOf(socket);
      if(data['1']>=3){
        VP[player] += data['1']-2;
      } else if (data['2']>=3) {
        VP[player] += data['2']-1;
      } else if (data['3']>=3) {
        VP[player] += data['3'];
      }
      //if(data['4'] || data['6']){
      if(player === currentEmperor){
        users.forEach((item,index)=>{
          if(index!==player){
            if (data['4']){
              HP[index] -= data['4'];            
            }
          }
          if(data['6']){
            HP[index] += data['6'];
            console.log('HP', HP)
          }
        })
        io.emit('updateHP', HP);  
      }
      if(data['5']){
        energy[player] += data['5'];
        io.emit('updateEnergy', energy);
      }
      //}
      currentTurn++;
      if (currentTurn > users.length - 1) {
        currentTurn = 0;
      }
      //change loadVP to updateVP when refactor
      console.log(VP)
      io.emit('updateVP', VP);
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
      socket.emit('stayOrLeave', false);
      io.emit('updateEmperor', currentEmperor);
    });

    socket.on('attackOne', (data) => {
      // From data we have data.damage and data.currentUser
      HP[currentEmperor] = HP[currentEmperor] - data.damage;
      io.emit('updateHP', HP);

      // Display option for the current emperor to leave San Francisco
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
      //change loadVP to updateVP when refactor
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
};
