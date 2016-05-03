import React from 'react';

const PlayerActions = (props) => {

  const attackAll = (dmg) => {
    let data = {
      damage: dmg,
      otherPlayers: props.otherPlayers,
      currentUser: props.currentUser,
    }
    props.socket.emit('attackAll', data);
  }

  return (
    <div>
      Player Actions
      <button
        className="btn btn-primary"
        onClick={ () => { attackAll(1); }}
      >
        Attack All
      </button>

    </div>
  );
};

export default PlayerActions;
