'use strict';
const Users = [];

const users = [];
const HP = [10, 10, 10, 10];
const maxHP = [10, 10, 10, 10];
const VP = [0, 0, 0, 0];
const energy = [0, 0, 0, 0];
let currentTurn = 0;
let discardPile = [];
let currentEmperor = 0;
const cards = ['acid spray', 'wood armor', 'energy sword'];

class UserTemplate {
  constructor(socket) {
    this.monster = null;
    this.HP = 10;
    this.maxHP = 10;
    this.VP = 0;
    this.maxVP = 20;
    this.socket = socket;
    this.energy = 0;
    this.inTokyo = false;
    this.rollRemaining = 3;
    this.maxRoll = 3;
    this.numberOfDice = 6;
    this.attackModifier = 0;
    this.armorModifier = 0;
    this.isEmperor = true;
  }
}


module.exports = (io) => {
  io.on('connection', (socket) => {
    // console.log('A user has connected!');
    // console.log('These are the connected sockets: ', Object.keys(socket.nsp.connected));
    // console.log('Just entered socket id: ', socket.id);
    if (Users.length < 6) {
      Users.push(new UserTemplate(socket));
    }
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].socket === socket) {
        socket.emit('getUser', i);
      }
    }
    /*
    if (users.length < 6) {
      users.push(socket);
    }
    // Data = Dice Object: {1:2,2:2,3:3,4:0,5:0,6:0}
    */

    // Update keep/unkeep
    socket.on('updateDice', data => {
      io.emit('diceDisplay', data);
    });

    // Roll dice from dices.js    
    socket.on('rollDice', data => {
      // search for current player
      let player;
      Users.forEach((user, index) => {
        if (user.socket === socket) {
          player = index;
        }
      });

      // Data to emit
      const result = {
        unkeep: data.unkeep,
        keep: data.keep,
      };

      // Player validator if rolling the dice
      if (currentTurn === player) {
        let diceArray = [];
        if (Users[player].rollRemaining > 0) {
          Users[player].rollRemaining--;

          data.unkeep.forEach(dice => {
            diceArray.push((Math.ceil(Math.random() * 6)));
          });

          result.unkeep = diceArray;
        }
      }

      // Emit to dices.js
      io.emit('diceDisplay', result);
    });


    socket.on('endTurn', (data) => {
      let player;
      Users.forEach((user, index) => {
        if (user.socket === socket) {
          player = index;
        }
      });
      
      if (data['1'] >= 3) {
        Users[player].VP += data['1'] - 2;
      } else if (data['2'] >= 3) {
        Users[player].VP += data['2'] - 1;
      } else if (data['3'] >= 3) {
        Users[player].VP += data['3'];
      }

      if (Users[player].isEmperor) {
        Users.forEach((user, index) => {
          if (index !== player) {
            if (data['4']) {
              user.HP -= data['4'];
            }
          }
        });
      } else {
        Users.forEach((user) => {
          if (user.isEmperor) {
            if (data['4']) {
              user.HP -= data['4'];
            }
          }
        });
        if (data['6']) {
          if (Users[player].HP + data['6'] <= Users[player].maxHP) {
            Users[player].HP += data['6'];
          } else {
            Users[player.HP] = Users[player].maxHP;
          }
        }
      }

      if (data['5']) {
        Users[player].energy += data['5'];
      }
      const tempHP = Users.map((user) => {
        return user.HP;
      });

      const tempVP = Users.map((user) => {
        return user.VP;
      });

      Users[player].rollRemaining = Users[player].maxRoll;

      currentTurn++;
      if (currentTurn > Users.length - 1) {
        currentTurn = 0;
      }

      const nextUsersDice = [];
      for (let i = 0; i < Users[currentTurn].numberOfDice; i++) {
        nextUsersDice.push(0);
      }

      io.emit('diceDisplay', { keep: [], unkeep: nextUsersDice });
      io.emit('updateEnergy', energy);
      io.emit('updateVP', tempVP);
      io.emit('updateHP', tempHP);
      io.emit('updateTurn', currentTurn);
    });
    /*
    // socket.on('endTurn', (data) => {
    //   const player = users.indexOf(socket);
    //   if (data['1'] >= 3) {
    //     VP[player] += data['1'] - 2;
    //   } else if (data['2'] >= 3) {
    //     VP[player] += data['2'] - 1;
    //   } else if (data['3'] >= 3) {
    //     VP[player] += data['3'];
    //   }
    //   // if(data['4'] || data['6']){
    //   if (player === currentEmperor) {
    //     users.forEach((item, index) => {
    //       if (index !== player) {
    //         if (data['4']) {
    //           HP[index] -= data['4'];
    //         }
    //       }
    //       if (data['6']) {
    //         HP[index] += data['6'];
    //         console.log('HP', HP);
    //       }
    //     });
    //     io.emit('updateHP', HP);
    //   }
    //   if (data['5']) {
    //     energy[player] += data['5'];
    //     io.emit('updateEnergy', energy);
    //   }
    //   currentTurn++;
    //   if (currentTurn > users.length - 1) {
    //     currentTurn = 0;
    //   }
    //   // change loadVP to updateVP when refactor
    //   console.log(VP);
    //   io.emit('updateVP', VP);
    //   io.emit('updateTurn', currentTurn);
    // });
    */

    /*
    socket.emit('getUser', users.indexOf(socket));
    */
    io.emit('loadUsers', Object.keys(Users).map((x) => {
      return parseInt(x, 10);
    }));
    /*
    io.emit('loadUsers', Object.keys(users).map((x) => {
      return parseInt(x, 10);
    }));
    */


    // if (users.length === 4) {
    //   io.emit('gameStarts', 'GAME STARTS!');
    // }

    // socket.on('leaveTokyo', (data) => {
    //   if (currentEmperor === data) { // Cheat check
    //     currentEmperor = -1; // City is vacated
    //   }
    //   socket.emit('stayOrLeave', false);
    //   io.emit('updateEmperor', currentEmperor);
    // });

    /*
    //we do not need attackOne for now, until the card dictate we need it
    socket.on('attackOne', (data) => {
      // From data we have data.damage and data.currentUser
      HP[currentEmperor] = HP[currentEmperor] - data.damage;
      io.emit('updateHP', HP);

      // Display option for the current emperor to leave San Francisco
      users[currentEmperor].emit('stayOrLeave', true);
    });
    */
    /*
    socket.on('attackAll', (data) => {
      // From data we have data.damage, data.otherPlayers, and data.currentUser
      data.otherPlayers.forEach((item) => {
        HP[item] = HP[item] - data.damage;
      });
      io.emit('updateHP', HP);
    });
    */

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

    /*
    socket.on('changeHP', (data) => {
      // change loadVP to updateVP when refactor
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
    */

    socket.on('disconnect', () => {
      console.log('A user has disconnected...');
      const i = users.indexOf(socket);
      users.splice(i, 1);
      io.emit('loadUsers', Object.keys(users));
    });
  });
};
