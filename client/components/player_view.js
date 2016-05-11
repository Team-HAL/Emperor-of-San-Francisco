import React from 'react';

const Player = (props) => {
  const divStyle = {
    display: 'table',
    float: 'left',
    margin: '13px 13px 10px 10px',
    padding: 0,
  };

  const headerStyle = {
    margin: 0,
  };

  const textStyle = {
    display: 'inline-block',
    position: 'relative',
    top: 0,
    left: 0,
    margin: 0,
    padding: 0,
    fontSize: '90%',
    textIndent: 7,
  };

  const statusBox = {
    margin: 0,
    padding: 0,
  };

  const hpProgressBar = {
    display: 'inline-block',
    position: 'relative',
    top: 3,
    margin: 0,
    marginLeft: 1,
    width: 50,
    height: 13,
    backgroundColor: '#ddd',
    opacity: 1,
  };

  const hpBar = {
    position: 'absolute',
    width: props.healthPoints[props.player] * 10 + '%',
    height: '100%',
    backgroundColor: '#00EF31',
  };

  const vpProgressBar = {
    display: 'inline-block',
    position: 'relative',
    top: 3,
    left: 1,
    margin: 0,
    marginLeft: 1,
    width: 50,
    height: 13,
    backgroundColor: '#ddd',
    opacity: 1,
  };

  const vpBar = {
    position: 'absolute',
    width: props.victoryPoints[props.player] * 5 + '%',
    height: '100%',
    backgroundColor: '#EFCA00',
  };

  const energyProgressBar = {
    display: 'inline-block',
    position: 'relative',
    top: 3,
    left: 3,
    margin: 0,
    marginLeft: 1,
    width: 50,
    height: 13,
    backgroundColor: '#ddd',
    opacity: 1,
  };

  const energyBar = {
    position: 'absolute',
    width: props.victoryPoints[props.player] < 20 ? props.victoryPoints[props.player] * 5 + '%' : '100%',
    height: '100%',
    backgroundColor: '#0035CA',
  };

  const statusText = {
    display: 'table',
    position: 'relative',
    top: -4.5,
    margin: 'auto',
    color: 'white',
  };

  const cardStyle = {
    width: 30,
    height: 50,
  };

  let items;
  if (props.cardsIndividual) {
    items = props.cardsIndividual[props.player].map((card) => {
      let img = `../../client/images/cards/${card.name}.jpeg`;
      return <img key={card.name + Math.random()} src={img} style={cardStyle} />;
    });
  } else {
    items = <p>You have no card</p>;
  }

  // let items = props.cards[props.player];
  return (
    <div style={divStyle}>
      <h5 style={headerStyle}>Player: {parseInt(props.player) + 1}</h5>
      <div style={statusBox}>
        <p style={textStyle}>HP:</p>
        <div style={hpProgressBar}>
          <div style={hpBar}>
            <div style={statusText}>{props.healthPoints[props.player]}</div>
          </div>
        </div>
      </div>
      <div style={statusBox}>
        <p style={textStyle}>VP:</p>
        <div style={vpProgressBar}>
          <div style={vpBar}>
            <div style={statusText}>{props.victoryPoints[props.player]}</div>
          </div>
        </div>
      </div>
      <div style={statusBox}>
        <p style={textStyle}>En:</p>
        <div style={energyProgressBar}>
          <div style={energyBar}>
            <div style={statusText}>{props.energy[props.player]}</div>
          </div>
        </div>
      </div>
      {items}
    </div>
  );
};

export default Player;
