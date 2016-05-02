import React, { Component } from 'react';
import User from './user';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      vp: [],
      status: 'Waiting for players. . .',
      currentID: 'a',
    };
    
    props.socket.on('loadUsers', (users) => {
      console.log(users);
      users = users.map((user, i) => {
        return (
          <User
            key={i + 1}
            id={i + 1}
          />
        );
      });

      this.setState({ users });
    });

    props.socket.on('getUser', (id) => {
      this.setState({ currentID: id });
    });

    props.socket.on('gameStarts', (status) => {
      this.setState({ status });
    });

    props.socket.on('updateVP', (data)=>{
      this.setState({ vp: data });
    })
  }

  increase(num){
    this.props.socket.emit('increaseVP', num);
  };

  render() {
    return (
      <div>
        <button onClick={()=>this.increase(2)}></button>
        <h3>{this.state.status}</h3>
        <h5>{this.state.currentID}</h5>
        <h5>{this.state.vp}</h5>        
        <ul>
          {this.state.users}
        </ul>
      </div>
    );
  }
}

export default UsersList;
