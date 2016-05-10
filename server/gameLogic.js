'use strict';
const e = require('./events.js');
const cards = require('./cardData.js');
const deck = cards.slice();
const Users = [];
let currentTurn = 1;
let discardPile = [];

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
    this.action = {
      attackmodifier: {},
      armormodifier: {},
      healmodifier: {},
    };
  }
}


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user has connected!');
    // console.log('These are the connected sockets: ', Object.keys(socket.nsp.connected));
    // console.log('Just entered socket id: ', socket.id);

    if (Users.length < 6) {
      let added = false;
      for (let i = 0; i < Users.length; i++) {
        if (!Users[i]) {
          Users[i] = new UserTemplate(socket);
          Users[i].isEmperor = i > 0 ? false : true;
          added = true;
        }
      }

      if (!added) {
        Users.push(new UserTemplate(socket));
      }
    }

    for (let i = 0; i < Users.length; i++) {
      if (Users[i].socket === socket) {
        socket.emit('getUser', i);
      }
    }

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

    socket.on('cardsDisplay', (data) => {
    });

    socket.on('buyCard', (data) => {

    });

    socket.on('preEndTurn', () => {
      socket.emit('midEndTurn');
    });

    socket.on('endTurn', (dicesKeep) => {
      let player;
      Users.forEach((user, index) => {
        if (user.socket === socket) {
          player = index;
        }
      });

      // data 4 is attack, 5 is energy, 6 is life
      const data = {};
      dicesKeep.forEach((diceValue) => {
        if (diceValue > 6) {
          diceValue = diceValue - 6;
        }

        if (data[diceValue]) {
          data[diceValue]++;
        } else {
          data[diceValue] = 1;
        }
      });

      // if (data['1'] >= 3) {
      //   Users[player].VP += data['1'] - 2;
      // } else if (data['2'] >= 3) {
      //   Users[player].VP += data['2'] - 1;
      // } else if (data['3'] >= 3) {
      //   Users[player].VP += data['3'];
      // }

      // if (Users[player].isEmperor) {
      //   Users.forEach((user, index) => {
      //     if (index !== player) {
      //       if (data['4']) {
      //         user.HP -= data['4'];
      //       }
      //     }
      //   });
      // } else {
      //   Users.forEach((user) => {
      //     if (user.isEmperor) {
      //       if (data['4']) {
      //         user.HP -= data['4'];
      //       }
      //     }
      //   });
      //   if (data['6']) {
      //     if (Users[player].HP + data['6'] <= Users[player].maxHP) {
      //       Users[player].HP += data['6'];
      //     }
      //   }
      // }

      e.onVPDiceIncrease(Users, player, data);
      e.onAttack(Users, player, data['4']);
      e.onHeal(Users, player, data['6']);

      if (data['5']) {
        Users[player].energy += data['5'];
      }
      
      e.onVPEmperorIncrease(Users, player);

      const tempHP = Users.map((user) => {
        return user.HP;
      });

      const tempVP = Users.map((user) => {
        return user.VP;
      });

      const tempEnergy = Users.map((user) => {
        return user.energy;
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

      let emitted = false;
      io.on('emperorYield', (data) => {
        if (data) {
          Users.forEach((user) => {
            if (user.isEmperor) {
              user.isEmperor = false;
              Users[player].isEmperor = true;
            }
          });
        }
        emitted = true;
        io.emit('emperorAttack', { canYield: false });
        io.emit('diceDisplay', { keep: [], unkeep: nextUsersDice });
        io.emit('updateHP', tempHP);
        io.emit('updateVP', tempVP);
        io.emit('updateEnergy', tempEnergy);
        io.emit('updateTurn', currentTurn);
      });


      setTimeout(() => {
        if (!emitted) {
          io.emit('diceDisplay', { keep: [], unkeep: nextUsersDice });
          io.emit('updateHP', tempHP);
          io.emit('updateVP', tempVP);
          io.emit('updateEnergy', tempEnergy);
          io.emit('updateTurn', currentTurn);
        }
      }, 5000);
    });

    io.emit('loadUsers', Object.keys(Users).map((x) => {
      return parseInt(x, 10);
    }));

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

    // socket.on('getEnergy', (data) => {
    //   // Data here would be the amount of energy to be added
    //   const i = users.indexOf(socket);
    //   energy[i] = energy[i] + data;

    //   io.emit('updateEnergy', energy);
    // });

    // not in used
    // socket.on('getCard', (data) => {
    //   // data here would be the number of cards you want to get
    //   const cardsToSend = [];

    //   for (let i = 0; i < data; i++) {
    //     cardsToSend.push(cards.splice(Math.floor(Math.random() * cards.length), 1));
    //   }

    //   discardPile = discardPile.concat(cardsToSend);
    //   socket.emit('loadCard', cardsToSend);
    // });

    socket.on('disconnect', () => {
      console.log('A user has disconnected...');
      const i = Users.indexOf(socket);
      delete Users[i];
      io.emit('loadUsers', Object.keys(Users));
    });
  });
};
