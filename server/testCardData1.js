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
  func(Users,player) {

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
}];
