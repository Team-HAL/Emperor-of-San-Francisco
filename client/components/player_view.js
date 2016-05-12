import React from 'react';
import Modal from 'react-modal';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalImage: 'None',
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(img) {
    this.setState({ modalIsOpen: true, modalImage: img });
  }

  afterOpenModal() {
    // For future expansion, useless right now
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
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

    const modalImageStyle = {
      display: 'inline-block',
      borderRadius: 30,
    };

    const divStyle = {
      display: 'inline-block',
      position: 'relative',
      margin: 0,
      padding: 0,
    };

    const headerStyle = {
      margin: 0,
      fontSize: '110%',
    };

    const textStyle = {
      display: 'inline-block',
      position: 'relative',
      top: 0,
      left: 0,
      margin: 0,
      padding: 0,
      fontSize: '90%',
      textIndent: 7,
    };

    const statusBox = {
      margin: 0,
      padding: 0,
    };

    const hpProgressBar = {
      display: 'inline-block',
      position: 'relative',
      top: 3,
      margin: 0,
      marginLeft: 1,
      width: 50,
      height: 13,
      backgroundColor: '#ddd',
      opacity: 1,
    };

    const hpBar = {
      position: 'absolute',
      width: this.props.healthPoints[this.props.player] * 10 + '%',
      height: '100%',
      backgroundColor: '#00EF31',
    };

    const vpProgressBar = {
      display: 'inline-block',
      position: 'relative',
      top: 3,
      left: 1,
      margin: 0,
      marginLeft: 1,
      width: 50,
      height: 13,
      backgroundColor: '#ddd',
      opacity: 1,
    };

    const vpBar = {
      position: 'absolute',
      width: this.props.victoryPoints[this.props.player] * 5 + '%',
      height: '100%',
      backgroundColor: '#EFCA00',
    };

    const energyProgressBar = {
      display: 'inline-block',
      position: 'relative',
      top: 3,
      left: 3,
      margin: 0,
      marginLeft: 1,
      width: 50,
      height: 13,
      backgroundColor: '#ddd',
      opacity: 1,
    };

    const energyBar = {
      position: 'absolute',
      width: this.props.victoryPoints[this.props.player] < 20 ? this.props.victoryPoints[this.props.player] * 5 + '%' : '100%',
      height: '100%',
      backgroundColor: '#0035CA',
    };

    const statusText = {
      display: 'table',
      position: 'relative',
      top: -7,
      margin: 'auto',
      color: 'white',
    };

    const cardStyle = {
      width: 30,
      height: 50,
    };

    let items;
    if (this.props.cardsIndividual) {
      items = this.props.cardsIndividual[this.props.player].map((card) => {
        let img = `../../client/images/cards/${card.name}.jpeg`;
        return <img key={card.name + Math.random()} src={img} style={cardStyle} onClick={() => this.openModal(img)} />;
      });
    } else {
      items = <p>You have no card</p>;
    }

    // if (document.getElementsByClassName('board')[0]) {
    //   console.log(document.getElementsByClassName('board')[0].getBoundingClientRect());
    // }
    // <div style={{ position: 'absolute', top: 422, left: 140, }}> don't erase
    // let items = props.cards[props.player].map((card) => {
    //   let img = `../../client/images/cards/${card.name}.jpeg`;
    //   return <img key={card.name + Math.random()} src={img} style={cardStyle} />;
    // }) || null;
    // let items = props.cards[props.player];

    return (
      <div style={divStyle}>
        <h5 style={headerStyle}>Player: {parseInt(this.props.player) + 1}</h5>

        <div style={statusBox}>
          <p style={textStyle}>HP:</p>
          <div style={hpProgressBar}>
            <div style={hpBar}>
              <div style={statusText}>{this.props.healthPoints[this.props.player]}</div>
            </div>
          </div>
        </div>

        <div style={statusBox}>
          <p style={textStyle}>VP:</p>
          <div style={vpProgressBar}>
            <div style={vpBar}>
              <div style={statusText}>{this.props.victoryPoints[this.props.player]}</div>
            </div>
          </div>
        </div>

        <div style={statusBox}>
          <p style={textStyle}>En:</p>
          <div style={energyProgressBar}>
            <div style={energyBar}>
              <div style={statusText}>{this.props.energy[this.props.player]}</div>
            </div>
          </div>
        </div>

        {items}
        
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
        >
          <div><img src={this.state.modalImage} style={modalImageStyle} /></div>
        </Modal>
      </div>
    );
  }
}
