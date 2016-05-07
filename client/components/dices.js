import React from 'react';
import Dice from './dice.js';

export default class Dices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      diceArray: [1, 1, 1, 1, 1, 1],
      maxRoll: 3,
    };
  }
  // getDiceArr(){
  //   const diceArray = []
  //   for(var i = 0; i<this.state.diceArray.length; i++){
  //     diceArray.push(this.refs[i].getDiceRoll());
  //   }
  //   console.log(diceArray);
  //   this.setState({ diceArray });
  // }
  render() {
    const items = this.state.diceArray.map((num, index) => {
      return <Dice key={index} random={num} ref={index}/>;
    });

    const divStyle = {
      display: 'table',
      position: 'absolute',
      top: 0,
      right: 0,
      margin: 0,
      padding: '0px',
    };

    const buttonStyle = {
      width: 50,
      height: 50,
      margin: '1px 1px',
      padding: '0px',
    };

    return (
      <div style={divStyle}>
        {items}
        <button
          className='btn btn-default'
          style={buttonStyle}
          onClick={() => {
            let diceArray = [];
            for (let i = 0; i < this.state.diceArray.length; i++) {
              diceArray.push(this.refs[i].roll());
            }
            this.props.update(diceArray);
            this.setState({ diceArray });
          }
        }>
          Roll!
        </button>
      </div>
    );
  }
}
