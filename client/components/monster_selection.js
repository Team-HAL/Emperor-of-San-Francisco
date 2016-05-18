import React from 'react';

const MonsterSelection = (props) => {
  let monsters = props.monsters.map((monster) => {
    const url = `../../client/images/monster/${monster}.png`;

    return (
      <input
        key={monster + Math.random()}
        type="image"
        name={monster}
        src={url}
        height="150"
        width="150"
        onClick={() => {
          props.onMonsterSelect(monster);
        }}
      />
    );
  });

  return (
    <div>
      {monsters}
    </div>
  );
};

export default MonsterSelection;