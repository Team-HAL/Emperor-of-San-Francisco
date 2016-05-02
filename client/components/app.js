import React, { Component } from 'react';
import UsersList from './users_list';

const socket = io.connect();

export default class App extends Component {
  render() {
  	return (
  	  <UsersList socket={socket} />
    );
  }
}
