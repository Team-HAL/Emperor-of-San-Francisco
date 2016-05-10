'use strict';

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
      this.onReceive(Users, target, damage);
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
    let playercards = Users[target].action.armormodifier;
    if (playercards) {
      for (let card in playercards) {
        damage = playercards[card](damage);
      }
    }
   
    // Do not change target user's HP if armor modifier negates all damage
    if (damage > 0) {
      Users[target].HP -= damage;
    }
    if (Users[target].isEmperor) {
      Users[target].socket.emit('emperorAttack', { canYield: true, damage: damage });
    }
  },
  
  onHeal: (Users, target, amount) => {
    let targetuser = Users[target];

    let playercards = targetuser.action.healmodifier;
    if (playercards) {
      for (let card in playercards) {
        playercards[card](targetuser);
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
    if (data['1'] >= 3) {
      targetuser.VP += data['1'] - 2;
    } else if (data['2'] >= 3) {
      targetuser.VP += data['2'] - 1;
    } else if (data['3'] >= 3) {
      targetuser.VP += data['3'];
    }  
  },

};
