'use strict';
module.exports = [
// TESTED CARDS

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
}

];

