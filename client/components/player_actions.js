import React from 'react';

const PlayerActions = (props) => {
  const _currentUserTurn = () => {
    return !(props.currentTurn === props.player);
  };

  const divStyle = {
    display: 'inline-block',
    position: 'relative',
    marginTop: 0,
    paddingTop: 0,
    top: 265,
    left: 467,
  };

  const buttonStyle = {
    display: 'block',
    width: 85,
    padding: '0px 2px',
    margin: '2px auto',
  };

  let canYield = false;

  props.socket.on('emperorAttack', (data) => {
    canYield = data.canYield;
  });

  return (
    <div style={divStyle}>
      <button
        className="btn btn-info"
        style={buttonStyle}
        onClick={() => { props.socket.emit('preEndTurn'); }}
        disabled={_currentUserTurn()}
      >
        End Turn
      </button>

      <button
        className="btn btn-danger"
        style={buttonStyle}
        disabled={!canYield}
        onClick={() => { props.socket.emit('emperorYield', true); }}
      >
        Yield
      </button>

      <button
        className="btn btn-warning"
        style={buttonStyle}
        disabled={!canYield}
        onClick={() => { props.socket.emit('emperorYield', false); }}
      >
        No Yield
      </button>
    </div>
  );
};

export default PlayerActions;

// const _leaveTokyo = () => {
//   props.socket.emit('leaveTokyo', props.player);
// };

// const _attackAll = (dmg) => {
//   const data = {
//     damage: dmg,
//     otherPlayers: props.otherPlayers,
//     currentUser: props.player,
//   };
//   props.socket.emit('attackAll', data);
// };

// const _increaseVP = (num) => {
//   props.socket.emit('increaseVP', num);
// };

/*
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
*/
