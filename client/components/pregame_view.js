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

  }

  handleSubmit() {


  }  

  loginPage() {
    return (
      <div className="loginForm center-block">
        <h2>Welcome to Emperor of San Francisco</h2>
        <h3></h3>
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

      </div>
    );
  }

  render() {
    return (this.state.formCompleted ? this.lobbyPage() : this.loginPage() );
  }
}

  // render() {
  //   return (this.state.formCompleted ? this.lobbyPage() : this.loginPage() );
  // }