'use strict';

const onReceiveHelper = (Users, target, damage) => {
  if (Users[target].action.armormodifier) {
    let playercards = Users[target].action.armormodifier;
    if (playercards) {
      for (let card in playercards) {
        damage = playercards[card](damage);
      }
    }
  }
  // Do not change target user's HP if armor modifier negates all damage
  if (damage > 0) {
    Users[target].HP -= damage;
  }
  if (Users[target].isEmperor) {
    Users[target].socket.emit('emperorAttack', { canYield: true, damage: damage });
  }
};


module.exports = {
  onAttack: (Users, player, damage) => {
    let targets = [];

    // Emperor attacks everyone
    if (Users[player].isEmperor) {
      Users.forEach(function (user, index) {
        if (index !== player) {
          targets.push(index);
        }
      });

   // Monsters outside of Tokyo attack only Emperor
    } else {
      Users.forEach((user, index) => {
        if (user.isEmperor) {
          targets.push(index);
        }
      });
    }

    // Invoke attack modifier actions to targets
    let playercards = Users[player].action.attackmodifier;
      if (playercards) {
        for (let card in playercards) {
          playercards[card](Users, targets);
        }
      }

    targets.forEach(function(target) {
      // Users[target].HP -= damage;

      onReceiveHelper(Users, target, damage);
    });
  },

  onBuy: (Users, card, currentCards, deck, player, currentTurn, from) => {
    if (player === currentTurn) {
      if (from) {
        console.log('buy from other people');
      } else {
        for (let i = 0; i < currentCards.length; i++) {
          if (currentCards[i].name === card && Users[player].energy >= currentCards[i].cost) {
            Users[player].energy -= currentCards[i].cost;
            if (currentCards[i].discard) {
              currentCards[i].func(Users, player);
              currentCards.splice(i, 1);
            } else {
              console.log(player);
              console.log(Users);
              currentCards[i].func(Users, player);
              Users[player].cards.push(currentCards.splice(i, 1)[0]);
            }
            module.exports.onDraw(currentCards, deck, 1);
          }
        }
      }
    }
  },

  loadUsers: (Users, io) => {
    io.emit('loadUsers', Object.keys(Users).map((x) => {
      return parseInt(x, 10);
    }));
  },

  getUser: (Users) => {
    for (let i = 0; i < Users.length; i++) {
      if (Users[i].socket === socket) {
        Users[i].socket.emit('getUser', i);
      }
    }
  },

  onVictory: (Users, player) =>{
    Users.forEach((user, index)=>{
      if(player === index){
        Users[player].socket.emit("win", 'You won!')
      } else {
        Users[index].socket.emit("lose", 'You lost!')
      }
    })
  },

  onDeath: (Users, player, io) => {
    let targetuser = Users[target];
    if (targetuser.action.deathmodifier) {
      let playercards = targetuser.action.deathmodifier;
      if (playercards) {
        for (let card in playercards) {
          playercards[card](targetuser);
        }
      }
    } else {
      Users[player].socket.emit("lose", 'You lost!')
      Users.splice(player,1);
      module.exports.getUser(Users);
      module.exports.loadUsers(Users, io)
    }
  },

  onDraw: (currentCards, deck, data) => {
    for (let i = 0; i < data; i++) {
      currentCards.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
    }
  },

  onReceive: (Users, target, damage) => {
    onReceiveHelper(Users, target, damage);
  },

  onHeal: (Users, target, amount) => {
    let targetuser = Users[target];
    if (targetuser.action.healmodifier) {
      let playercards = targetuser.action.healmodifier;
      if (playercards) {
        for (let card in playercards) {
          playercards[card](targetuser);
        }
      }
    }
    if (!targetuser.isEmperor) {
      if (targetuser.HP + amount <= targetuser.maxHP) {
        targetuser.HP += amount;
      } else {
        targetuser.HP = targetuser.maxHP;
      }
    }
  },

  onVPDiceIncrease: (Users, target, dice) => {
    let targetuser = Users[target];
    if (dice['1'] >= 3) {
      targetuser.VP += dice['1'] - 2;
    } else if (dice['2'] >= 3) {
      targetuser.VP += dice['2'] - 1;
    } else if (dice['3'] >= 3) {
      targetuser.VP += dice['3'];
    }
  },

  onVPEmperorIncrease: (Users, player) => {
    let currentplayer = Users[player];
    if (currentplayer.isEmperor) {
      currentplayer.VP++;
    }
  },

  onEnergyIncrease: (Users, player, amount) => {
    let playercards = Users[player].action.energymodifier;
    if (playercards) {
      for (let card in playercards) {
        playercards[card](amount);
      }
    }
    Users[player].energy += amount;
  },

  onGameStart: (Users) => {
    // Randomize Emperor
    let startingemperor = Math.floor(Math.random() * Users.length);
    Users[startingemperor].isEmperor = true;
  },

  findEmperor: (Users) => {
    let currentEmperor = -1;
    Users.forEach(function (user, index) {
      if (user.isEmperor) {
        currentEmperor = index;
      }
    });
    return currentEmperor;
  },
};
