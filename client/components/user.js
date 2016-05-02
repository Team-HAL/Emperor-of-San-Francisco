import React from 'react';
import Modal from 'react-modal';

const User = React.createClass({

  getInitialState: function() {
    return { modalIsOpen: false };
  },

  openModal: function() {
    this.setState({ modalIsOpen: true });
  },

  afterOpenModal: function() {
    this.refs.subtitle.style.color = '#f00';
  },

  closeModal: function() {
    this.setState({ modalIsOpen: false });
  },
  
  render: function() {
    return (
      <li>
      <span onClick={this.openModal}>Player {this.props.id}</span>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
        >

          <h2 ref="subtitle" style={{ display: 'inline' }}>To Player {this.props.id}</h2>
          <button style={{ display: 'inline' }} onClick={this.closeModal}>close</button>
          <div>messages will be here</div>
          <form>
            <input />
            <button>send</button>
          </form>
        </Modal>
      </li>
    );
  },
});

export default User;
