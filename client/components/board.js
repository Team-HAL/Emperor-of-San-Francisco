import React from 'react';

const Board = (props) => {
  const divStyle = {
    backgroundImage: 'url("../../client/images/board/esfBoard.jpg")',
    backgroundSize: 'cover',
    position: 'absolute',
    top: 150,
    left: 550,
    zIndex: -1,
    width: 325,
    height: 325,
    padding: 0,
    // margin: '229px auto', don't erase
    borderRadius: 5,
    boxShadow: '1px 1px 5px #888888',
    zIndex:0,
  };

  return <div className="board" style={divStyle}></div>;
};

export default Board;
