import React from 'react';
// import EmperorView from './emperor_view';

// import FlatButton from 'material-ui/FlatButton';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {deepOrange500} from 'material-ui/styles/colors';


const PlayerActions = (props) => {
  const _attackAll = (dmg) => {
    const data = {
      damage: dmg,
      otherPlayers: props.otherPlayers,
      currentUser: props.player,
    };
    props.socket.emit('attackAll', data);
  };

  const _increaseVP = (num) => {
    props.socket.emit('increaseVP', num);
  };

  const _currentUserTurn = () => {
    return !(props.currentTurn === props.player);
  };

  const _leaveTokyo = () => {
    props.socket.emit('leaveTokyo', props.player);
  };

  const divStyle = {
    display: 'table',
    float: 'left',
    clear: 'right',
    position: 'relative',
    top: 0,
    left: 0,
    margin: '10px 0px',
    padding: 0,
  };

  const buttonStyle = {
    display: 'block',
    width: 85,
    padding: '0px 2px',
    margin: '0px auto',
  };

  return (
    <div style={divStyle}>
      <button
        className="btn btn-danger"
        style={buttonStyle}
        onClick={() => { _attackAll(1); }}
        disabled={_currentUserTurn()}
      >
        Attack All
      </button>

      <button
        className="btn btn-primary"
        style={buttonStyle}
        onClick={() => { _increaseVP(1); }}
        disabled={_currentUserTurn()}
      >
        Increase VP
      </button>

      <button
        className="btn btn-info"
        style={buttonStyle}
        onClick={() => { props.socket.emit('preEndTurn'); }}
        disabled={_currentUserTurn()}
      >
        End Turn
      </button>

      <button
        className="btn btn-primary"
        style={buttonStyle}
        disabled={!props.stayOrLeave}
        onClick={() => { _leaveTokyo(); }}
      >
        Leave SF
      </button>
    </div>
  );
};

export default PlayerActions;
