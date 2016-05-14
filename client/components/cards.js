import React from 'react';
import Card from './card_view.js';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: [],
      gameStarted: false,
    };

    props.socket.on('cardDisplay', (data) => {
      this.setState({ card:data });
    });

    props.socket.on('startGame', () => {
      this.state.gameStarted = true;
    });

    this.start = this.start.bind(this);
    this.draw = this.draw.bind(this);
  }

  start() {
    this.props.socket.emit('start', 'placeholder');
  }

  draw() {
    this.props.socket.emit('draw', 3 - this.state.card.length);
  }

  render() {
    const items = this.state.card.map((item) => {
      return (
        <Card
          key={item.name + Math.random()}
          item={item}
          socket={this.props.socket}
          currentUser={this.props.currentUser}
          currentTurn={this.props.currentTurn}
        />
      );
    });

    const buttonStyle = {
      width: 50,
      height: 50,
      margin: '1px 1px',
      padding: '0px',
    };

    const style = {
      position: 'absolute',
      top: 53,
      right: 0,
    };

    return (
      <div style={style}>
        {items}
        {this.state.gameStarted ? null :
          <button 
            onClick={() => {
              this.start();
              this.draw();
            }}
            className='btn btn-primary'
            style={buttonStyle}
          >
            Draw Card
          </button>
        }
      </div>
    );
  }
}
