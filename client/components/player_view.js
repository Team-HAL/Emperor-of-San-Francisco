import React from 'react';

const Player = (props) => {
  return (
    <div>
      <h5>Player: { props.player + 1}</h5>
      <p>Victory Points: { props.victoryPoints[props.player] }</p>
      <button 
        className="btn btn-primary"
        onClick={ () => { props.addVP(1); }}
      >
        Increase Victory Points
      </button>
    </div>
  );
};

export default Player;
