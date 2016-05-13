import React from 'react';

const Board = (props) => {
  const divStyle = {
    backgroundImage: 'url("../../client/images/board/esfBoard.jpg")',
    backgroundSize: 'cover',
    position: 'relative',
    top: 268,
    left: 356,
    zIndex: -1,
    width: 388,
    height: 388,
    padding: 0,
    // margin: '229px auto', don't erase
    borderRadius: 5,
    boxShadow: '1px 1px 5px #888888',
  };

  return <div className="board" style={divStyle}></div>;
};

export default Board;
