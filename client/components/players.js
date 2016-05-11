import React from 'react';
import PlayerView from './player_view.js';

const Players = (props) => {
  let players = props.otherPlayers.map((userid) => {
    return (
      <PlayerView
        key={userid}
        player={userid}
        victoryPoints={props.victoryPoints}
        healthPoints={props.healthPoints}
        energy={props.energy}
        cardsIndividual={props.cardsIndividual}
      />
      );
  });

  return (
    <div>
      <h3>Other Players</h3>
      {players}
    </div>
  );
};

export default Players;
