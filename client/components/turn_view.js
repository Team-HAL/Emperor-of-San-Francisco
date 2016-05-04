import React from 'react';

const TurnView = (props) => {
  const KOTHView = () => {
    if (props.currentEmperor > -1) {
      return props.currentEmperor +  1;
    }
    return 'No one';
  }

  return (
    <div>
      <h3>Player {props.currentTurn + 1}'s Turn</h3>
      <h3>King of the Hill: { KOTHView }</h3>
    </div>
    );

};

export default TurnView;
