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
        let results = [];
        results = playercards[card](Users, player, targets, damage);
        targets = results[0];
        damage = results[1];
      }
    }

    targets.forEach(function(target) {
      const originalDamage = damage; // checks if player is fire breathing
      if (Users[target].isNeighborOfFireBreather && damage > 0 &&
          Users[player].action.attackmodifier.fire_breathing) {
        if (Users[player].isEmperor || Users[target].isEmperor) {
          damage = damage + 1;
        } else {
          damage = 1;
        }
      }
      // } else if (Users[target].isNeighborOfFireBreather && Users[target].isEmperor &&
      //            damage > 0 && Users[player].action.attackmodifier.fire_breathing) {
      //   damage++;
      // }

      onReceiveHelper(Users, target, damage);
      damage = originalDamage;
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

  getUser: (Users, socket) => {
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

  onDeath: (Users, player, currentTurn, io, socket) => {
    let targetuser = Users[player];
    console.log(Object.keys(Users).length)
    if (Object.keys(Users).length===0) {
      let playercards = targetuser.action.deathmodifier;
      if (playercards) {
        for (let card in playercards) {
          playercards[card](targetuser);
        }
      }
    } else {
      Users[player].socket.emit("lose", 'You lost!');
      console.log('You lose, player ' + player);
      if (Users[player].isEmperor) {
        Users[player].isEmperor = false;
        Users[currentTurn].isEmperor = true;      
      }
      if (player === currentTurn && Users[player]){      
        Users[player].isEmperor = false;
        do {
          currentTurn--;
          if(currentTurn < 0) {
            currentTurn = Users.length - 1;
          }
        } while(!Users[currentTurn].isAlive);
        Users[currentTurn].isEmperor = true;
      }
      Users[player].isAlive = false;
      module.exports.getUser(Users, socket);
      module.exports.loadUsers(Users, io);
    }
  },

  onDraw: (currentCards, deck, data) => {
    if (deck.length) {
      for (let i = 0; i < data; i++) {
        currentCards.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0]);
      }
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
      if (amount) {
        if (targetuser.HP + amount <= targetuser.maxHP) {
          targetuser.HP += amount;
        } else {
          targetuser.HP = targetuser.maxHP;
        }
      }
    }
  },

  onVPDiceIncrease: (Users, target, dice) => {
    let playercards = Users[target].action.dicemodifier;
    if (playercards) {
      for (let card in playercards) {
        playercards[card](Users, target, dice);
      }
    }

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
      currentplayer.VP += 2;
    }
  },

  onEnergyIncrease: (Users, player, amount) => {
    let playercards = Users[player].action.energymodifier;
    if (playercards) {
      for (let card in playercards) {
        amount = playercards[card](Users, player, amount);
      }
    }

    if (amount) {
      Users[player].energy += amount;
    }
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
