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
      // display: 'table-column-group',
      width: 150,
      height: 200,
      padding: 0,
      margin: 0,
      borderRadius: 10,
      boxShadow: '1px 1px 5px #888888',
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
      zIndex: 1,
    };

    return (
      <li style={{ width:200,  margin: 2 }}>
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
            onClick={() => {
              this.buyCard();
            }}
          >
            Buy card
          </button>
        </div>
        </Modal>
      </li>

    );
  }
}
