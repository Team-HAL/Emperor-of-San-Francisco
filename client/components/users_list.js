import React, { Component } from 'react';
import User from './user';

class UsersList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      status: 'Waiting for players. . .',
    };
    
    props.socket.on('loadUsers', (users) => {
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

    props.socket.on('gameStarts', (status) => {
      this.setState({ status });
    });
  }

  render() {
    return (
      <div>
        <h3>{this.state.status}</h3>
        <ul>
          {this.state.users}
        </ul>
      </div>
    );
  }
}

export default UsersList;
