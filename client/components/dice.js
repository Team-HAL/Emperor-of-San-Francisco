import React from 'react';

const Dice = (props) => {
  const style = {
    borderRadius: 8,
    width: 50,
    height: 50,
    margin: '1px 1px',
  };

  let image = `../../client/images/dice/${props.keep ? props.number + 6 : props.number}.jpeg`;

  return (
    <img
      style={style}
      src={image}
    />
  );
};

export default Dice;
