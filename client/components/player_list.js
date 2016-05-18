import React from 'react';

const PlayerList = (props) => {
  let items = props.userNicknames.map((name, key) => {
    let url;
    let monster;
    if (!props.userMonsters[key]) {
      monster = '';
      url = `../../client/images/monster/Unknown.png`;
    } else {
      url = `../../client/images/monster/${props.userMonsters[key]}.png`;
      monster = props.userMonsters[key];
    }


    let userName;
    if (!name) {
      userName = 'Waiting on player...'; 
    } else {
      userName = name;
    }

    return (
      <tr key={key + Math.random()}>
        <td className="col-sm-1"><h5>{key + 1}</h5></td>
        <td className="col-sm-5"><h5>{userName}</h5></td>
        <td className="col-sm-6">
          <img src={url} height="150" width="150" />
          <p>{monster}</p>
        </td>
      </tr>
      );
  });

  return (
    <table className="table">
      <tbody>
        <tr>
          <td className="col-sm-1"><h3>#</h3></td>
          <td className="col-sm-5"><h3>Nickname</h3></td>
          <td className="col-sm-6"><h3>Monster</h3></td>
        </tr>
        {items}
      </tbody>
    </table>
  );

};

export default PlayerList;
