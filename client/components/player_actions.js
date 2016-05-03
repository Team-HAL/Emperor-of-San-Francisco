import React from 'react';

const PlayerActions = (props) => {

  const _attackAll = (dmg) => {
    let data = {
      damage: dmg,
      otherPlayers: props.otherPlayers,
      currentUser: props.currentUser,
    }
    props.socket.emit('attackAll', data);
  }

  const _increaseVP = (num) => {
    props.socket.emit('increaseVP', num);
  }

  const _endTurn = () => {
    props.socket.emit('endTurn');
  }

  return (
    <div>
      Player Actions
      <li>
        <button
          className="btn btn-primary"
          onClick={ () => { _attackAll(1); }}
        >
          Attack All
        </button>
      </li>

      <li>
        <button
          className="btn btn-primary"
          onClick={ () => { _increaseVP(1); }}
        >
          Increase current user Victory Points
        </button>
      </li>

      <li>
        <button
          className="btn btn-primary"
          onClick={ () => { _endTurn(); }}
        >
          End Turn
        </button>
      </li>
    </div>
  );
};

export default PlayerActions;
