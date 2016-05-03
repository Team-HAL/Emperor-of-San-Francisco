import React from 'react';

const Player = (props) => {
  return (
    <div>
      <h5>Player: { parseInt(props.player) + 1 }</h5>
      <p>Health Points: { props.healthPoints[props.player] }</p>
      <p>Victory Points: { props.victoryPoints[props.player] }</p>
      <p>Energy: { props.energy[props.player] }</p>
    </div>
  );
};

export default Player;
