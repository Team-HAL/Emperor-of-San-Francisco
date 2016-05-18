import React from 'react';
import Card from './card_view.js';

export default class Cards extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      card: [],
    };
    this.draw = this.draw.bind(this);
  }

  componentDidMount() {
    this.props.socket.on('cardDisplay', (data) => {
      this.setState({ card: data });
    });
  }
  componentWillUnmount() {
    this.props.socket.off('cardDisplay');
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
      float: 'left',
      width: 50,
      height: 50,
      margin: '1px 1px',
      padding: '0px',
      zIndex: 1,
    };

    const style = {
      position: 'relative',
      top: 0,
      left: 0,
      margin: 0,
      border: 1,
      width: 300,
    };

    return (
      <ul style={style}>
        {items}
        {this.state.card.length >= 3 ? null :
          <button
            onClick={() => {
              this.draw();
            }}
            className='btn btn-primary'
            style={buttonStyle}
          >
            Draw<br />Card
          </button>
        }
      </ul>
    );
  }
}
