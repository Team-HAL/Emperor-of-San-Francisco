import React from 'react';

const Board = (props) => {
  const divStyle = {
    backgroundImage: 'url("../../client/images/board/esfBoard.jpg")',
    backgroundSize: 'cover',
    position: 'absolute',
    top: 275,
    left: 445,
    zIndex: -1,
    width: 550,
    height: 550,
    padding: 0,
    // margin: '229px auto', don't erase
    borderRadius: 5,
    boxShadow: '1px 1px 5px #888888',
    zIndex:0,
  };

  return <div className="board" style={divStyle}></div>;
};

export default Board;
