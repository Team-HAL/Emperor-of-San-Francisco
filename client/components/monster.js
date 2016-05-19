import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';


const Monster = (props) => {
    // props.player
    // props.currentEmperor
    // props.userMonster
  let monsterArray = props.userMonsters.slice(props.player+1).concat(props.userMonsters.slice(0, props.player+1));
  monsterArray = monsterArray.reverse();
  const monsters = monsterArray.map((monster, i, array) => {
    const deg = 360 / (array.length);
    let monster_url = `../../client/images/monster/${monsterArray[i]}.png`;
    let style = {
      position: 'absolute',
      zIndex: 0,
      margin: 0,
      padding: 0,
      width: 150,
      height: 150,
      top: 500 - 425 * Math.cos((i) * deg * (Math.PI / 180)),
      left: 600 - 425 * Math.sin((i) * deg * (Math.PI / 180)),
    };

    const emperor = {
      top: 300,
      left: 470,
      zIndex: 0,
      width:525,
      height:525,
      position: 'absolute',
    };
    const checkEmperor = () => {
      if (props.userMonsters[props.currentEmperor] === monster) {
        return emperor;
      } else {
        return style;
      }
    }
    return <img src={ monster_url } key={ monster } style={checkEmperor()} />;
  });
  return (
    <div>
      { monsters }
    </div>
    );
};

export default Monster;