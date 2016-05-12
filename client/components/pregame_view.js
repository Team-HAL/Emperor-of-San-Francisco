import React from 'react';
import MonsterSelection from './monster_selection.js';

class PregameView extends React.Component {
  constructor(props) {
    super(props);
    // Props: users

    this.state = {
      selectableMonsters: ['Alienoid', 'Cyber_Bunny', 'Giga_Zaur', 'Kraken', 'Meka_Dragon', 'The_King'],
      formCompleted: false,
      nickname: '',
      monster: '',
    };
    this.props.socket.on('updateSelectabledMonsters', this._updateSelectabledMonsters.bind(this));

  }

  _updateSelectabledMonsters(selectableMonsters) {
    this.setState({ selectableMonsters });
  }

  handleSubmit(event) {
    event.preventDefault();
    const playerInfo = {
      nickname: this.state.nickname,
      monster: this.state.monster,
      player: this.props.player,
    }
    this.props.socket.emit('onPlayerSelect', playerInfo);
    this.setState({formCompleted: true});
  }

  startGame() {
    this.props.onGameStart(true);
    this.props.socket.emit('start', 'temp');
  }  

  loginPage() {
    return (
      <div className="loginForm center-block">
        <h3>Select a Monster and Name</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group">
            <label>Nickname:</label>
            <input
              onChange = {name => {
                this.setState( {nickname: name.target.value} );
              }}
              className="form-control" 
              type="text" />
          </div>
          <div className="form-group">
            <label>Monster:</label>
            <p>{this.state.monster}</p>
          </div>
          <div className="form-group">
            <input type="submit" />
          </div>
        </form>
        <div>
          <MonsterSelection
            monsters={this.state.selectableMonsters}
            onMonsterSelect= { (chosenMonster) => {
              this.setState({ monster: chosenMonster });
            }}
          />
        </div>
      </div>
    );
  }

  lobbyPage() {   

    return (
      <div>
        <div>
          <li>{this.props.userNicknames[0]} - {this.props.userMonsters[0]}</li>
          <li>{this.props.userNicknames[1]} - {this.props.userMonsters[1]}</li>
          <li>{this.props.userNicknames[2]} - {this.props.userMonsters[2]}</li>
          <li>{this.props.userNicknames[3]} - {this.props.userMonsters[3]}</li>
          <li>{this.props.userNicknames[4]} - {this.props.userMonsters[4]}</li>
          <li>{this.props.userNicknames[5]} - {this.props.userMonsters[5]}</li>
        </div>
        <div>
          <button onClick={() => this.startGame()}> Start Game </button>
        </div>
      </div>
    );
  }

  render() {
    return (this.state.formCompleted ? this.lobbyPage() : this.loginPage());
  }
}

export default PregameView;
    // return (this.state.formCompleted ? this.lobbyPage() : this.loginPage());
