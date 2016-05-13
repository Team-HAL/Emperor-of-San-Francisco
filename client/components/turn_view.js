import React from 'react';

const TurnView = (props) => {
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
    fontSize: '170%',
  };


  return (
    <div style={divStyle}>
      <h3 style={textStyle}>Current Turn: {props.userNicknames[props.currentTurn]}</h3>
      <h3 style={textStyle}>Current Emperor: {props.userNicknames[props.currentEmperor]}</h3>
    </div>
  );
};

export default TurnView;
