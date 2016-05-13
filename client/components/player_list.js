import React from 'react';

const PlayerList = (props) => {
  let items = props.userNicknames.map((name, key) => {
    const url = `../../client/images/monster/${props.userMonsters[key]}.png`;
    return (
      <tr>
        <td className="col-sm-1"><h5>{key + 1}</h5></td>
        <td className="col-sm-5"><h5>{name}</h5></td>
        <td className="col-sm-6">
          <img src={url} height="150" width="150" />
          <p>{props.userMonsters[key]}</p>
        </td>
      </tr>
      );
  });

  return (
    <table className="table">
      <tr>
        <td className="col-sm-1"><h3>#</h3></td>
        <td className="col-sm-5"><h3>Nickname</h3></td>
        <td className="col-sm-6"><h3>Monster</h3></td>
      </tr>
      {items}
    </table>
  );

};

export default PlayerList;
