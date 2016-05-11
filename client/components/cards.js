import React from 'react';
import Card from './card_view.js';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // card: [{
      //   name: 'nuclear_powerplant',
      //   cost: 6,
      //   discard: true,
      // },
      // {
      //   name: 'gas_refinery',
      //   cost: 6,
      //   discard: true,
      // },
      // {
      //   name: 'rapid_healing',
      //   cost: 3,
      //   discard: false,
      // },
      // {
      //   name: 'healing_ray',
      //   cost: 4,
      //   discard: false,
      // },
      // {
      //   name: 'commuter_train',
      //   cost: 4,
      //   discard: true,
      // },
      // ],
      card: [],
    };
    props.socket.on('cardDisplay', (data) => {
      this.setState({ card:data });
    });

    this.start = this.start.bind(this);
    this.draw = this.draw.bind(this);

  }

  start() {
    console.log('starting');
    this.props.socket.emit('start', 'placeholder');
  }

  draw() {
    this.props.socket.emit('draw', 3 - this.state.card.length);
  }

  render() {
    const items = this.state.card.map((item) => {
      return <Card
        key={item.name}
        item={item}
        socket={this.props.socket}
        currentUser = {this.props.currentUser}
        currentTurn = {this.props.currentTurn}
      />;
    });

    const style = {
      position: 'absolute',
      top: 560,
      right: 0,
    };

    return(
      <div style={style}>
        {items}
        {/*Deck image*/}
        <button onClick={() => { this.start(); this.draw() }}>Start game!</button>
        <img src="" />
      </div>
    );
  }
}
