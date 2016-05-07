import React from 'react';

const Board = (props) => {
  const divStyle = {
    backgroundImage: 'url("../../client/images/board/esfBoard.jpg")',
    backgroundSize: 'cover',
    position: 'relative',
    zIndex: -1,
    width: 1100,
    height: 486,
    padding: 0,
    margin: 0,
  };

  return <div style={divStyle}></div>;
};

export default Board;
