import React from 'react';

const TurnView = (props) => {
  const KOTHView = () => {
    if (props.currentEmperor > -1) {
      return props.currentEmperor +  1 + '';
    }
    return 'City is Empty';
  }

  const divStyle = {
    display: 'table',
    position: 'relative',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
  };

  const textStyle = {
    margin: 0,
  };

  return (
    <div>
      <h3>Player {props.currentTurn + 1}'s Turn</h3>
      <h3>King of the Hill: { KOTHView() }</h3>
    </div>
    );

};

export default TurnView;
