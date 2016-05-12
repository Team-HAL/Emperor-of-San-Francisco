import React from 'react';

const Board = (props) => {
  const divStyle = {
    backgroundImage: 'url("../../client/images/board/esfBoard.jpg")',
    backgroundSize: 'cover',
    position: 'relative',
    top: 228,
    left: 356,
    zIndex: -1,
    width: 388,
    height: 388,
    padding: 0,
    // margin: '229px auto', don't erase
    borderRadius: 5,
  };

  return <div className="board" style={divStyle}></div>;
};

export default Board;
