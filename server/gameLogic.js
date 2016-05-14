'use strict';
const e = require('./events.js');
const cards = require('./test2.js');
const deck = cards.slice();
let currentCards = [];
let discardPile = [];
const Users = [];
let currentTurn = 1;
let currentEmperor = -1;
let selectableMonsters = ['Alienoid', 'Cyber_Bunny', 'Giga_Zaur', 'Kraken', 'Meka_Dragon', 'The_King'];
let userMonsters = [];
let userNicknames = [];

class UserTemplate {
  constructor(socket) {
    this.nickname = null;
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
      attackmodifier: {
        // SpikedTail: (Users, targets) => {
        //   targets.forEach((target) => {
        //     Users[target].HP -= 1;
        //   });
        // },
      },
      armormodifier: {},
      healmodifier: {},
      energymodifier: {},
    };
  }
}


module.exports = (io) => {
  io.on('connection', (socket) => {
    console.log('A user has connected!');
    // console.log('These are the connected sockets: ', Object.keys(socket.nsp.connected));
    // console.log('Just entered socket id: ', socket.id);

    io.emit('updateSelectabledMonsters', selectableMonsters);

    // Update pregame lobby list
    userMonsters.push(null);
    userNicknames.push(null);
    io.emit('updateUserMonsters', userMonsters);
    io.emit('updateUserNicknames', userNicknames);

    // allows someone to replace a disconnected user
    if (Users.length < 6) {
      let added = false;
      for (let i = 0; i < Users.length; i++) {
        if (!Users[i]) {
          Users[i] = new UserTemplate(socket);
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
      e.onGameStart(Users);
      currentEmperor = e.findEmperor(Users);
      io.emit('updateEmperor', currentEmperor);
      io.emit('startGame', true);
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
      const tempHP = Users.map((user) => {
        return user.HP;
      });

      const tempVP = Users.map((user) => {
        return user.VP;
      });
      io.emit('updateHP', tempHP);
      io.emit('updateVP', tempVP);
      io.emit('updateEnergy', tempEnergy);
      io.emit('updateCards', tempCards);
      io.emit('cardDisplay', currentCards);
      io.emit('updateEmperor', currentEmperor);
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

      const nextUsersDice = [];
      for (let i = 0; i < Users[currentTurn].numberOfDice; i++) {
        nextUsersDice.push(0);
      }

      emitted = true;
      io.emit('emperorAttack', { canYield: false });
      io.emit('diceDisplay', { keep: [], unkeep: nextUsersDice });
      io.emit('updateHP', tempHP);
      io.emit('updateVP', tempVP);
      io.emit('updateEnergy', tempEnergy);
      io.emit('updateEmperor', currentEmperor);
      io.emit('updateTurn', currentTurn);
      // onDeath
      // tempHP.forEach((HP, index)=>{
      //   if (HP<=0){
      //     Users[index]
      //   }
      // })
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

      e.onVPDiceIncrease(Users, player, data);
      e.onAttack(Users, player, data['4']);
      e.onHeal(Users, player, data['6']);
      e.onEnergyIncrease(Users, player, data['5']);
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


      setTimeout(() => {
        if (!emitted) {
          currentTurn++;
          if (currentTurn > Users.length - 1) {
            currentTurn = 0;
          }

          const nextUsersDice = [];
          for (let i = 0; i < Users[currentTurn].numberOfDice; i++) {
            nextUsersDice.push(0);
          }

          io.emit('diceDisplay', { keep: [], unkeep: nextUsersDice });
          io.emit('updateHP', tempHP);
          io.emit('updateVP', tempVP);
          io.emit('updateEnergy', tempEnergy);
          io.emit('updateEmperor', currentEmperor);
          io.emit('updateTurn', currentTurn);
        }
        emitted = false;
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

    // Pregame Lobby
    socket.on('onPlayerSelect', (playerInfo) => {
      let indexOfMonster = selectableMonsters.indexOf(playerInfo.monster);
      selectableMonsters.splice(indexOfMonster, 1);

      let player;
      Users.forEach((user, index) => {
        if (user.socket === socket) {
          player = index;
        }
      });

      Users[player].nickname = playerInfo.nickname;
      Users[player].monster = playerInfo.monster;

      userMonsters = Users.map((user) => {
        return user.monster;
      });

      userNicknames = Users.map((user) => {
        return user.nickname;
      });

      io.emit('updateSelectabledMonsters', selectableMonsters);
      io.emit('updateUserMonsters', userMonsters);
      io.emit('updateUserNicknames', userNicknames);

    });
  });
};
