'use strict';
module.exports = [{
  name: 'nuclear_powerplant',
  cost: 6,
  discard: true,
  func(Users, player) {
    Users[player].HP += 3;
    Users[player].VP += 2;
  },
}, {
  name: 'gas_refinery',
  cost: 6,
  discard: true,
  func(Users, player) {
    Users[player].VP += 2;
    for (let i = 0; i < Users.length; i++) {
      if (i !== player) {
        Users[i].HP -= 3;
      }
    }
  },
}, {
//   name: 'rapid_healing',
//   cost: 3,
//   discard: false,
// }, {
  name: 'regeneration',
  cost: 4,
  discard: false,
  func(Users, player, amount) {
    if (amount > 0 ){
      amount++;
    }
  }
}, {
  name: 'friend_of_children',
  cost: 3,
  discard: false,
  func(Users, player, amount) {
    if (amount > 0 ){
      amount++;
    }
  }
}, {
//   name: 'jets',
//   cost: 5,
//   discard: false,
// }, {
//   name: 'poison_spit',
//   cost: 4,
//   discard: false,
// }, {
  name: 'extra_head',
  cost: 7,
  discard: false,
  func(Users, player){
    Users[player].numberOfDice++;
  },
}, {
  name: 'extra_head',
  cost: 7,
  discard: false,
  func(Users, player){
    Users[player].numberOfDice++;
  },
},

// {
//   name: 'poison_quills',
//   cost: 3,
//   discard: false,
// }, {
//   name: 'burrowing',
//   cost: 5,
//   discard: false,
// }, {
//   name: 'frenzy',
//   cost: 7,
//   discard: true,
// },

{
  name: 'urbavore',
  cost: 4,
  discard: false,
  func(Users, player) {
    Users[player].action.attackmodifier.urbavore = (Users, player, targets, damage) => {
      if (Users[player].isEmperor) {
        Users[player].VP += 1;
      }

      if (Users[player].isEmperor && damage > 0) {
        damage = damage + 1;
      }

      return [targets, damage];
    };
  },
}, {
  name: 'acid_attack',
  cost: 6,
  discard: false,
  func(Users, player) {
    Users[player].action.attackmodifier.acid_attack = (Users, player, targets, damage) => {
      damage = typeof damage !== 'number' ? 1 : damage + 1;

      return [targets, damage];
    };
  },
}, {
  name: 'even_bigger',
  cost: 4,
  discard: true,
  func(Users, player){
    Users[player].maxHP = 12;
    Users[player].HP +=2;
  }
}, {
  name: 'fire_breathing',
  cost: 4,
  discard: false,
  func(Users, player) {
    Users[player].action.attackmodifier.fire_breathing = (Users, player, targets, damage) => {
      if (Users.length > 3) {
        const neighBorRight = Users.length - 1 === player ? 0 : player + 1;
        Users[neighBorRight].isNeighborOfFireBreather = true;
        const neighBorLeft = player === 0 ? Users.length - 1 : player - 1;
        Users[neighBorLeft].isNeighborOfFireBreather = true;
      } else {
        for (let i = 0; i < Users.length; i++) {
          if (i !== player) {
            Users[i].isNeighborOfFireBreather = true;
          }
        }
      }

      // push the neighbor(s) inside the targets for fire breather
      for (let i = 0; i < Users.length; i++) {
        if (Users[i].isNeighborOfFireBreather && targets.indexOf(i) === -1) {
          targets.push(i);
        }
      }

      return [targets, damage];
    };
  },
}, {
//   name: 'dedicated_news_team',
//   cost: 3,
//   discard: false,
// }, {
  name: 'nova_breath',
  cost: 7,
  discard: false,
  func(Users, player) {
    Users[player].action.attackmodifier.nova_breath = (Users, player, targets, damage) => {
      if (!Users[player].isEmperor) {
        Users.forEach(function(user, index) {
          if (index !== player && targets.indexOf(index) === -1) {
            targets.push(index);
          }
        });
      }

      return [targets, damage];
    };
  },
}, {
  name: 'alpha_monster',
  cost: 5,
  discard: false,
  func(Users, player) {
    Users[player].action.attackmodifier.alpha_monster = (Users, player, targets, damage) => {
      if (damage > 0) {
        Users[player].VP += 1;
      }

      return [targets, damage];
    };
  },
},

{
  name: 'omnivore',
  cost: 4,
  discard: false,
  func(Users, player) {
    Users[player].action.dicemodifier.omnivore = (Users, player, dice) => {
      console.log('Omnivore');
      console.log(dice['1'] > 0 && dice['2'] > 0 && dice['3'] > 0);
      if (dice['1'] > 0 && dice['2'] > 0 && dice['3'] > 0) {
        Users[player].VP += 2;
      }
    }
  }
},

{
  name: 'herbivore',
  cost: 5,
  discard: false,
  func(Users, player) {
    Users[player].action.dicemodifier.herbivore = (Users, player, dice) => {
      console.log("Herbivore");
      console.log(!dice['4']);
      if (!dice['4']) {
        Users[player].VP +=1;
      }
    }
  }
},

{
  name: 'complete_destruction',
  cost: 3,
  discard: false,
  func(Users, player) {
    Users[player].action.dicemodifier.complete_destruction = (Users, player, dice) => {
      if (dice['1'] === 1 &&
          dice['2'] === 1 &&
          dice['3'] === 1 &&
          dice['4'] === 1 &&
          dice['5'] === 1 &&
          dice['6'] === 1) {
        Users[player].VP += 9;
      }
    }
  }
},

//   name: 'telepath',
//   cost: 4,
//   discard: false,
// }, {
//   name: 'rooting_for_the_underdog',
//   cost: 3,
//   discard: false,
// }, {
//   name: 'gourmet',
//   cost: 4,
//   discard: false,
// }, {
//   name: 'wings',
//   cost: 6,
//   discard: false,
// }, {
//   name: 'armor_plating',
//   cost: 4,
//   discard: false,
// }, {
{
  name: 'energy_hoarder',
  cost: 3,
  discard: false,
  func(Users, player) {
    Users[player].action.energymodifier.energy_hoarder = (Users, player, amount) => {
      console.log(player);
      console.log(Users[player]);
      const totalEnergy = amount + Users[player].energy;
      if (totalEnergy >= 6) {
        Users[player].VP += parseInt(totalEnergy / 6);
      }
      return amount;
    }
  }
},

{
  name: 'solar_powered',
  cost: 2,
  discard: false,
  func(Users, player){
    Users[player].action.energymodifier.solar_powered = (Users, player, amount) => {
      if ((!amount) && Users[player].energy === 0) {
        return 1;
      } else {
        return amount;
      }
    }
  }
},


{
//   name: 'healing_ray',
//   cost: 4,
//   discard: false,
// }, {
  name: 'vast_storm',
  cost: 6,
  discard: true,
  func(Users, player) {
    Users[player].VP += 2;
    for (let i = 0; i < Users.length; i++) {
      if (i !== player) {
        Users[i].energy = Math.floor(Users[i].energy / 2);
      }
    }
  },
}, {
  name: 'apartment_building',
  cost: 5,
  discard: true,
  func(Users, player) {
    Users[player].VP += 3;
  },
}, {
  name: 'jet_fighter',
  cost: 5,
  discard: true,
  func(Users, player) {
    Users[player].VP += 5;
    Users[player].HP -= 4;
  },
}, {
  name: 'skyscraper',
  cost: 6,
  discard: true,
  func(Users, player) {
    Users[player].VP += 4;
  },
}, {
  name: 'death_from_above',
  cost: 5,
  discard: true,
  func(Users, player) {
    if(!Users[player].isEmperor){
      for(var i = 0; i < Users.length; i++){
        if(Users[i].isEmperor){
          Users[i].isEmperor = false;
        }
      }
      Users[player].isEmperor = true;
    }
  }
}, {
  name: 'tanks',
  cost: 4,
  discard: true,
  func(Users, player) {
    Users[player].HP -= 3;
    Users[player].VP += 4;
  },
}, {
  name: 'national_guard',
  cost: 3,
  discard: true,
  func(Users, player) {
    Users[player].HP -= 2;
    Users[player].VP += 2;
  },
}, {
  name: 'cornerstore',
  cost: 3,
  discard: true,
  func(Users, player) {
    Users[player].VP += 1;
  },
}, {
  name: 'fire_blast',
  cost: 3,
  discard: true,
  func(Users, player) {
    for (let i = 0; i < Users.length; i++) {
      if (i !== player) {
        Users[i].HP -= 2;
      }
    }
  },
}, {
  name: 'heal',
  cost: 3,
  discard: true,
  func(Users, player) {
    Users[player].HP += 2;
  },
}, {
  name: 'energize',
  cost: 8,
  discard: true,
  func(Users, player) {
    Users[player].energy += 9;
  },
}, {
  name: 'high-altitude_bombing',
  cost: 4,
  discard: true,
  func(Users, player) {
    for (let i = 0; i < Users.length; i++) {
      Users[i].HP -= 3;
    }
  },
}, {
  name: 'evacuation_order',
  cost: 7,
  discard: true,
  func(Users, player) {
    for (let i = 0; i < Users.length; i++) {
      if (i !== player) {
        if (Users[i].VP <= 5) {
          Users[i].VP = 0;
        } else {
          Users[i].VP -= 5;
        }
      }
    }
  },
}, {
  name: 'commuter_train',
  cost: 4,
  discard: true,
  func(Users, player) {
    Users[player].VP += 2;
  },
}, {
  name: 'spiked_tail',
  cost: 5,
  discard: false,
  func(Users, player) {
    Users[player].action.attackmodifier.spiked_tail = (Users, player, targets, damage) => {
      if (damage > 0) {
        damage = damage + 1;
      }

      return [targets, damage];
    };
  },
}];
