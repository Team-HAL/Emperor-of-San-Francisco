import React from 'react';

const Dice = (props) => {
  const style = {
    borderRadius: 8,
    width: 50,
    height: 50,
    margin: '1px 1px',
  };

  let image = `../../client/images/dice/${props.keep ? 6 + parseInt(props.number) : props.number}.jpeg`;

  return (
    <img
      style={style}
      src={image}
      onClick={() => {
        if (props.number !== 0){
          props.keepFunc(props.index);         
        }
      }}
    />
  );
};

export default Dice;
