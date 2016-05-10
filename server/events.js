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
      Users.forEach(function(user, index) {
        if (index !== player) {
          targets.push(index);
        }
      });

   // Monsters outside of Tokyo attack only Emperor  
    } else {
      Users.forEach((user) => {
        if (user.isEmperor) {
          targets.push(user);
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
  onBuy: (Users, from) => {
    if (from) {
      console.log('buy from other people');
    } else {
      console.log('buy from deck');
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
      currentplayer.VP ++;
    }
  }

};