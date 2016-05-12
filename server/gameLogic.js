'use strict';
const e = require('./events.js');
const cards = require('./cardData.js');
const deck = cards.slice();
let currentCards = [];
let discardPile = [];
const Users = [];
let currentTurn = 1;
let currentEmperor = -1;

class UserTemplate {
  constructor(socket) {
    this.monster = null;
    this.HP = 10;
    this.maxHP = 10;
    this.VP = 0;
    this.maxVP = 20;
    this.socket = socket;
    this.energy = 10;
    this.inTokyo = false;
    this.rollRemaining = 3;
    this.maxRoll = 3;
    this.numberOfDice = 6;
    this.attackModifier = 0;
    this.armorModifier = 0;
    this.isEmperor = false;
    this.cards = [];
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

    // this would only happen once (when the user connects)
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].socket === socket) {
        socket.emit('getUser', i);
      }
    }

    socket.on('start', (data) => {
      console.log('starting');
      e.onGameStart(Users);
      currentEmperor = e.findEmperor(Users);
      io.emit("updateEmperor", currentEmperor);
    });

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

    socket.on('draw', (data) => {
      e.onDraw(currentCards, deck, data);
      io.emit('cardDisplay', currentCards);
    });

    socket.on('buyCard', (data) => {
      let player;
      Users.forEach((user, index) => {
        if (user.socket === socket) {
          player = index;
        }
      });
      // if (player === currentTurn){
        e.onBuy(Users, data, currentCards, deck, player, currentTurn);

        const tempCards = Users.map((user) => {
          return user.cards;
        });

        const tempEnergy = Users.map((user) => {
          return user.energy;
        });

        io.emit('updateEnergy', tempEnergy);
        io.emit('updateCards', tempCards);
        io.emit('cardDisplay', currentCards);
      // }
    });

    // emperor yield listerner should be outside endturn listener
    let emitted = false;
    socket.on('emperorYield', (data) => {
      if (data) {
        Users.forEach((user, i) => {
          if (user.isEmperor) {
            Users[i].isEmperor = false;
            Users[currentTurn].isEmperor = true;
            currentEmperor = e.findEmperor(Users);
          }
        });
      }

      const nextUsersDice = [];
      for (let i = 0; i < Users[currentTurn].numberOfDice; i++) {
        nextUsersDice.push(0);
      }

      const tempHP = Users.map((user) => {
        return user.HP;
      });

      const tempVP = Users.map((user) => {
        return user.VP;
      });

      const tempEnergy = Users.map((user) => {
        return user.energy;
      });

      currentTurn++;
      if (currentTurn > Users.length - 1) {
        currentTurn = 0;
      }

      emitted = true;
      io.emit('emperorAttack', { canYield: false });
      io.emit('diceDisplay', { keep: [], unkeep: nextUsersDice });
      io.emit('updateHP', tempHP);
      io.emit('updateVP', tempVP);
      io.emit('updateEnergy', tempEnergy);
      io.emit('updateEmperor', currentEmperor);
      io.emit('updateTurn', currentTurn);
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

      const nextUsersDice = [];
      for (let i = 0; i < Users[currentTurn].numberOfDice; i++) {
        nextUsersDice.push(0);
      }

      setTimeout(() => {
        if (!emitted) {
          currentTurn++;
          if (currentTurn > Users.length - 1) {
            currentTurn = 0;
          }

          io.emit('diceDisplay', { keep: [], unkeep: nextUsersDice });
          io.emit('updateHP', tempHP);
          io.emit('updateVP', tempVP);
          io.emit('updateEnergy', tempEnergy);
          io.emit('updateEmperor', currentEmperor);
          io.emit('updateTurn', currentTurn);
        }
      }, 5000);
    });

    io.emit('loadUsers', Object.keys(Users).map((x) => {
      return parseInt(x, 10);
    }));

    socket.on('disconnect', () => {
      console.log('A user has disconnected...');
      const i = Users.indexOf(socket);
      delete Users[i];
      io.emit('loadUsers', Object.keys(Users));
    });
  });
};
