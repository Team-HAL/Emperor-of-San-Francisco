import React from 'react';

export default class PlayerActions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      canYield: false,
      endedTurn: false,
      currentUserTurn: this.props.currentTurn === this.props.player,
    };
  }

  _endedTurn() {
    this.setState({ endedTurn: true });
    setTimeout(() => {
      this.setState({ endedTurn: false });
    }, 5000);
  }

  render() {
    this.props.socket.on('emperorAttack', (data) => {
      this.setState({ canYield: data.canYield });

      setTimeout(() => {
        this.setState({ canYield: false });
      }, 5000);
    });

    const divStyle = {
      display: 'inline-block',
      position: 'relative',
      marginTop: 0,
      paddingTop: 0,
      top: 285,
      left: 580,
    };

    const buttonStyle = {
      display: 'block',
      width: 85,
      padding: '0px 2px',
      margin: '2px auto',
    };

    return (
      <div style={divStyle}>
        <button
          className="btn btn-info"
          style={buttonStyle}
          onClick={() => {
            this.props.socket.emit('preEndTurn');
            this._endedTurn();
          }}
          disabled={!this.state.endedTurn ? this.props.currentTurn !== this.props.player : this.state.endedTurn}
        >
          End Turn
        </button>

        <button
          className="btn btn-danger"
          style={buttonStyle}
          disabled={!this.state.canYield || (this.props.player !== this.props.currentEmperor)}
          onClick={() => { this.props.socket.emit('emperorYield', true); }}
        >
          Yield
        </button>

        <button
          className="btn btn-warning"
          style={buttonStyle}
          disabled={!this.state.canYield || (this.props.player !== this.props.currentEmperor)}
          onClick={() => { this.props.socket.emit('emperorYield', false); }}
        >
          Stay
        </button>
      </div>
    );
  }
}

// const _leaveTokyo = () => {
//   props.socket.emit('leaveTokyo', props.player);
// };

// const _attackAll = (dmg) => {
//   const data = {
//     damage: dmg,
//     otherPlayers: props.otherPlayers,
//     currentUser: props.player,
//   };
//   props.socket.emit('attackAll', data);
// };

// const _increaseVP = (num) => {
//   props.socket.emit('increaseVP', num);
// };

/*
<button
  className="btn btn-danger"
  style={buttonStyle}
  onClick={() => { _attackAll(1); }}
  disabled={_currentUserTurn()}
>
  Attack All
</button>

<button
  className="btn btn-primary"
  style={buttonStyle}
  onClick={() => { _increaseVP(1); }}
  disabled={_currentUserTurn()}
>
  Increase VP
</button>
*/
