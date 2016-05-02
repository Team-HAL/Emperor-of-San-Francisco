import React from 'react';
import UsersList from './users_list';

const socket = io.connect();

export default class App extends React.Component {
  render() {
    return (
      <UsersList socket={socket} />
    );
  }
}


// export default class App extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       users: [],
//     };
//   }

//   componentDidMount() {
//     socket.on('loadUsers', this._userConnect);
//   }

//   _userConnect(data) {
//     var users = this.state.users;
//     const { users } = this.state;
//     users.push(data);
//     this.setState({ users });
//   }

//   let items = this.state.users.map(function(user){
//     return(
//       <Player users={user} />
//     )

//    })

//   render() {
//     return (
//       {items}
//     );
//   }
// }

