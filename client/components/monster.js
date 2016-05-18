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
      zIndex: 1,
      margin: 0,
      padding: 0,
      width: 100,
      height: 100,
      top: 300 + 300 * Math.cos((i) * deg * (Math.PI / 180)),
      left: 625 + 300 * Math.sin((i) * deg * (Math.PI / 180)),
    };

    const emperor = {
      top: 175,
      left: 575,
      zIndex: 1,
      width:275,
      height:275,
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