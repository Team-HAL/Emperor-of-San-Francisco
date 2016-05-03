import React from 'react';
import PlayerView from './player_view.js';
import Players from './players.js';

import _ from 'lodash';

// import UsersList from './users_list';

const socket = io.connect();

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
      victoryPoints: [],
      currentUser: 0,
      otherPlayers: [],
    };
    socket.on('getUser', this._currentUser.bind(this));
    socket.on('loadUsers', this._userConnect.bind(this));
    socket.on('updateVP', this._updateVP.bind(this));
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

  _updateVP(victoryPoints) {
    this.setState({ victoryPoints });
  }

  _increaseVP(num) {
    socket.emit('increaseVP', num);
  }


  render() {
    return (
      <div>
        {/* Current Player View */}
        <PlayerView
          key={this.state.currentUser}
          player={this.state.currentUser}
          victoryPoints={this.state.victoryPoints}
        />

        <button
          className="btn btn-primary"
          onClick={ () => { this._increaseVP(1); }}
        >
          Increase current user Victory Points
        </button>

        {/* Other Player View */}
        <Players
          otherPlayers={this.state.otherPlayers}
          victoryPoints={this.state.victoryPoints}
        />

      </div>
    );
  }
}

