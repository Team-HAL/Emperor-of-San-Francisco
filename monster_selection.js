import React from 'react';

const MonsterSelection = (props) => {
  let monsters = props.monsters.map((monster) => {
    const url = `../../client/images/monster/${monster}.png`;

    return (
      <input 
        type="image"
        name={monster}
        src={url}
        onClick={() => {
          props.onMonsterSelect(monster);
        }}
      />
    );
  });
};

