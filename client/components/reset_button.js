import React from 'react';

const ResetButton = (props) => {
  const buttonStyle = {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 60,
    height: 50,
    margin: '1px 1px',
    padding: '0px',
    zIndex: 1,
  };
  
  return (
    <div>
      <button
        className="btn btn-danger"
        style={buttonStyle}
        onClick={() => {
          props.socket.emit('restartGame');
        }}
      >
      Restart<br />Game
      </button>
    </div>
  );

};

export default ResetButton;