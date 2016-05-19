import React from 'react';
import PlayerView from './player_view.js';

const Players = (props) => {
  let arrangedOtherPlayers = [];

  const arranger = () => {
    let count = props.player;
    for (let i = 0; i < props.otherPlayers.length; i++) {
      if (count < props.otherPlayers.length) {
        arrangedOtherPlayers.push(++count);
      } else {
        count = 0;
        arrangedOtherPlayers.push(count);
      }
    }
    arrangedOtherPlayers = arrangedOtherPlayers.reverse();
  };

  arranger();

  let players = arrangedOtherPlayers.map((userid, i, array) => {
    const deg = 360 / (array.length + 1);

    const style = {
      display: 'inline-block',
      position: 'absolute',
      zIndex: 0,
      margin: 0,
      padding: 0,
      top: 500 - 425 * Math.cos((i + 1) * deg * (Math.PI / 180)),
      left: 740 - 425 * Math.sin((i + 1) * deg * (Math.PI / 180)),
    };

    return (
      <div style={style} key={userid}>
        <PlayerView
          player={userid}
          victoryPoints={props.victoryPoints}
          healthPoints={props.healthPoints}
          energy={props.energy}
          cardsIndividual={props.cardsIndividual}
          userNicknames={props.userNicknames}
          userMonsters={props.userMonsters}
          currentTurn={props.currentTurn}
          currentEmperor={props.currentEmperor}
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
