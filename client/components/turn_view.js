import React from 'react';

const TurnView = (props) => {
  const KOTHView = () => {
    if (props.currentEmperor > -1) {
      return props.currentEmperor +  1;
    }
    return 'No one';
  };

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
    fontSize: '190%',
  };


  return (
    <div style={divStyle}>
      <h3 style={textStyle}>Turn: Player {props.currentTurn + 1}</h3>
      <h3 style={textStyle}>King: Player {KOTHView()}</h3>
    </div>
  );
};

export default TurnView;
