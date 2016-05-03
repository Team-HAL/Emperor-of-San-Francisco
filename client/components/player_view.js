import React from 'react';

const Player = (props) => {
  return (
    <div>
      <h5>Player: { parseInt(props.player) + 1 }</h5>
      <p>Victory Points: { props.victoryPoints[props.player] }</p>
    </div>
  );
};

export default Player;
