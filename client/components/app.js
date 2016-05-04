import React from 'react';
import PlayerView from './player_view.js';
import Players from './players.js';
import PlayerActions from './player_actions.js';
import TurnView from './turn_view.js';

import _ from 'lodash';
import Dices from './dices.js'
import CardsView from './cards.js'


const socket = io.connect();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      victoryPoints: [0, 0, 0, 0],
      healthPoints: [10, 10, 10, 10],
      energy: [0, 0, 0, 0],
      currentUser: 0,
      currentTurn: 0,
      otherPlayers: [],
      currentEmperor: 0,
      stayOrLeave: true,
      diceArray: [],
    };

    socket.on('getUser', this._currentUser.bind(this));
    socket.on('loadUsers', this._userConnect.bind(this));
    socket.on('updateTurn', this._updateTurn.bind(this));
    socket.on('updateVP', this._updateVP.bind(this));
    socket.on('updateHP', this._updateHP.bind(this));
    socket.on('updateEnergy', this._updateEnergy.bind(this));
    socket.on('updateEmperor', this._updateEmperor.bind(this));
    socket.on('stayOrLeave', this._updateEmperorView.bind(this));
  }

  _userConnect(newPlayer) {
    const otherPlayerIDs = newPlayer;
    otherPlayerIDs.splice(this.state.currentUser, 1);
    this.setState({ users: newPlayer });
    this.setState({ otherPlayers: otherPlayerIDs });
  }

  _currentUser(currentUser) {
    const { otherPlayers } = this.state;
    otherPlayers.splice(currentUser, 1);
    this.setState({ currentUser });
    this.setState({ otherPlayers });
  }

  _updateTurn(currentTurn) {
    this.setState({ currentTurn });
  }

  _updateVP(victoryPoints) {
    this.setState({ victoryPoints });
  }

  _updateHP(healthPoints) {
    this.setState({ healthPoints });
  }

  _updateEnergy(energy) {
    this.setState({ energy });
  }

  _updateEmperor(currentEmperor) {
    console.log(currentEmperor);
    this.setState({ currentEmperor });
  }

  _updateEmperorView(stayOrLeave) {
    this.setState({ stayOrLeave });
  }

  _updateDiceArray(diceArray){
    this.setState({ diceArray })
  }

  render() {
    return (
      <div>
        <Dices update= {(data)=>this._updateDiceArray(data)}/>
        <TurnView
          currentTurn={this.state.currentTurn}
        />

        {/* Current Player View */}
        <PlayerView
          key={this.state.currentUser}
          player={this.state.currentUser}
          victoryPoints={this.state.victoryPoints}
          healthPoints={this.state.healthPoints}
          energy={this.state.energy}
        />

        <PlayerActions
          diceArray={this.state.diceArray}
          socket={socket}
          player={this.state.currentUser}
          otherPlayers={this.state.otherPlayers}
          stayOrLeave={this.state.stayOrLeave}
          currentTurn={this.state.currentTurn}
        />

        {/* Other Player View */}
        <Players
          otherPlayers={this.state.otherPlayers}
          victoryPoints={this.state.victoryPoints}
          healthPoints={this.state.healthPoints}
          energy={this.state.energy}
        />

      <CardsView />
      </div>
    );
  }
}

