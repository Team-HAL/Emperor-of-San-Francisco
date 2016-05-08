import React from 'react';
import Dice from './dice.js';

export default class Dices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keep: [],
      unkeep: [0, 0, 0, 0, 0, 0],
    };

    // From gameLogic's rollDice listener everytime we roll at the bottom
    props.socket.on('diceDisplay', data => {
      this.setState({keep: data.keep, unkeep: data.unkeep});
    });
  }
  keep(index) {
    const temp = this.state;
    temp.keep.push(temp.unkeep.splice(index, 1));
    this.props.socket.emit('updateDice', temp);
  }
  unkeep(index) {
    const temp = this.state;
    temp.unkeep.push(temp.keep.splice(index, 1));
    this.props.socket.emit('updateDice', temp);
  }
  render() {
    const unkeep = this.state.unkeep.map((num, index) => {
      return <Dice key={`unkeep${index}`} keepFunc={this.keep.bind(this)} keep= {false}  number={num} index={index}/>;
    });

    const keep = this.state.keep.map((num, index) => {
      return <Dice key={`keep${index}`} keepFunc={this.unkeep.bind(this)} keep = {true} number={num} index={index}/>;
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
        {unkeep}
        {keep}
        <button
          className='btn btn-default'
          style={buttonStyle}
          onClick={() => {
            this.props.socket.emit('rollDice', this.state);
          }
        }>
          Roll!
        </button>
      </div>
    );
  }
}
