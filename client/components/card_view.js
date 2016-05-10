import React from 'react';
import Modal from 'react-modal';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.buyCard = this.buyCard.bind(this);
    this.drawOne = this.drawOne.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // For future expansion, useless right now
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  }

  buyCard() {
    this.props.socket.emit('buyCard', this.props.item.name);
  }

  drawOne() {
    this.props.socket.emit('draw', 1);
  }


  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    let img = `../../client/images/cards/${this.props.item.name}.jpeg`;

    const customStyles = {
      content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    const style = {
      display: 'inline-block',
      width: 168,
      height: 240,
      margin: 5,
      borderRadius: 10,
    };

    const buttonStyle = {
      position: 'relative',
      width: 300,
      height: 50,
      left: '30%',
    };

    const modalImageStyle = {
      display: 'inline-block',
      borderRadius: 30,
    };

    return (
      <div style={{ display: 'inline-block', margin: 5 }}>
        <img onClick={this.openModal} style={style} src={img} />
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
        <div><img src={img} style={modalImageStyle} /></div>
        <div>
          <button
            style={buttonStyle}
            className="btn btn-primary"
            onClick={() => { this.buyCard(); this.drawOne() }}
          >
            Buy card
          </button>
        </div>
        </Modal>
      </div>

    );
  }
}
