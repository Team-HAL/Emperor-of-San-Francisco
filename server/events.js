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
  },

}
