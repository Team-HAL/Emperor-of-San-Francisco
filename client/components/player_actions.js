import React from 'react';
import EmperorView from './emperor_view';

import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';


const PlayerActions = (props) => {

  const _attackAll = (dmg) => {
    let data = {
      damage: dmg,
      otherPlayers: props.otherPlayers,
      currentUser: props.player,
    }
    props.socket.emit('attackAll', data);
  }

  const _increaseVP = (num) => {
    props.socket.emit('increaseVP', num);
  }

  const _endTurn = () => {
    console.log(props);
    props.socket.emit('endTurn');
  }

  const _currentUserTurn = () => {
    return !(props.currentTurn === props.player);
  }

  // Refactor this.
  const muiTheme = getMuiTheme({
    palette: {
      accent1Color: deepOrange500,
    },
  });

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div>
        Player Actions
        <li>
          <FlatButton
            onClick={ () => { _attackAll(1); }}
            label="Attack All"
            disabled={_currentUserTurn()}
          />
        </li>

        <li>
          <FlatButton
            onClick={ () => { _increaseVP(1); }}
            label="Increase current user Victory Points"
            disabled={_currentUserTurn()}
          />
        </li>

        <li>
          <FlatButton
            className="btn btn-primary"
            onClick={ () => { _endTurn(); }}
            label="End Turn"
            disabled={_currentUserTurn()}
          />
        </li>
        <EmperorView
          currentUser={props.player}
          stayOrLeave={props.stayOrLeave}
          socket={props.socket}
        />

      </div>
    </MuiThemeProvider>
  );
};

export default PlayerActions;
