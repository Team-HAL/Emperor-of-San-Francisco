import React from 'react';

const Players = (props) => {
  let items = props.users.map((userid) => {
    return (
      <PlayersView
        userid={userid}
      />
      );
  });
  return (
    <div>
      <h5>Users online</h5>
      <ul>
        {items}
      </ul>
    </div>
  );
};

export default EventNearby;
