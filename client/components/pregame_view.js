import React from 'react';
import MonsterSelection from './monster_selection.js';
import PlayerList from './player_list.js';

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
    

  }

  componentDidMount() {
    this.props.socket.on('updateSelectabledMonsters', (selectableMonsters) => { this.setState({ selectableMonsters}) });
    this.props.socket.on('formCompleted', (formCompleted) => { this.setState({ formCompleted }) });
  }

  componentWillUnmount() {
    this.props.socket.off('updateSelectabledMonsters');
    this.props.socket.off('formCompleted');  
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
    this.props.socket.emit('start', {draw:false});
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
        <PlayerList
          userNicknames={this.props.userNicknames}
          userMonsters={this.props.userMonsters}
        />
        <div>
          <button onClick={() => this.startGame() }> Start Game </button>
        </div>
      </div>
    );
  }

  render() {
    return (this.state.formCompleted ? this.lobbyPage.bind(this)() : this.loginPage());
  }
}

export default PregameView;
    // return (this.state.formCompleted ? this.lobbyPage() : this.loginPage());
