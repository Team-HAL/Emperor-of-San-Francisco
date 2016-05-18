import React from 'react';

const ResetButton = (props) => {
  const buttonStyle = {
    display: 'block',
    width: 85,
    padding: '0px 2px',
    margin: '2px auto',
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
      Restart Game
      </button>
    </div>
  );

};

export default ResetButton;