import React from 'react';

const Player = (props) => {
  const divStyle = {
    display: 'table',
    float: 'left',
    position: 'relative',
    top: 0,
    left: 0,
    margin: '13px 13px 10px 10px',
    padding: 0,
  };

  const headerStyle = {
    margin: 0,
  };

  const textStyle = {
    margin: 0,
    'textIndent': 7,
  };

  return (
    <div style={divStyle}>
      <h5 style={headerStyle}>Player: {parseInt(props.player) + 1}</h5>
      <p style={textStyle}>Health Points: {props.healthPoints[props.player]}</p>
      <p style={textStyle}>Victory Points: {props.victoryPoints[props.player]}</p>
      <p style={textStyle}>Energy: {props.energy[props.player]}</p>
    </div>
  );
};

export default Player;
