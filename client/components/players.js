import React from 'react';
import PlayerView from './player_view.js';

const Players = (props) => {
  let items = props.otherPlayers.map((userid) => {
    return (
      <PlayerView
        key={userid}
        player={userid}
        victoryPoints={props.victoryPoints}
        healthPoints={props.healthPoints}
      />
      );
  });
  return (
    <div>
      <h3>Other Players</h3>
      {items}
    </div>
  );
};

export default Players;
