import React from 'react';
import PlayerView from './player_view.js';

const Players = (props) => {
  let players = props.otherPlayers.map((userid, i, array) => {
    const deg = 360 / (array.length + 1);
    const style = {
      display: 'inline-block',
      position: 'absolute',
      zIndex: 1,
      margin: 0,
      padding: 0,
      top: 420 + 300 * Math.cos((userid + 1) * deg * (Math.PI / 180)),
      left: 510 + 300 * Math.sin((userid + 1) * deg * (Math.PI / 180)),
    };
    return (
      <div style={style} key={userid}>
        <PlayerView
          player={userid}
          victoryPoints={props.victoryPoints}
          healthPoints={props.healthPoints}
          energy={props.energy}
          cardsIndividual={props.cardsIndividual}
        />
      </div>
    );
  });

  return (
    <div style={{ display: 'inline-block' }}>
      {players}
    </div>
  );
};

export default Players;
