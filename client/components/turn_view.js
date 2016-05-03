import React from 'react';

const TurnView = (props) => {

  return (
    <div>
      <h3>Player {props.currentTurn + 1}'s Turn</h3>
    </div>
    );

};

export default TurnView;
