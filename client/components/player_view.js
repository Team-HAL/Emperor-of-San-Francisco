'use strict';
import React from 'react';
import Modal from 'react-modal';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

export default class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modalIsOpen: false,
      modalImage: 'None',
      hpDifference: 0,
      vpDifference: 0,
      energyDifference: 0,
    };
    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      hpDifference: nextProps.healthPoints[nextProps.player] - this.props.healthPoints[this.props.player],
      vpDifference: nextProps.victoryPoints[nextProps.player] - this.props.victoryPoints[this.props.player],
      energyDifference: nextProps.energy[nextProps.player] - this.props.energy[this.props.player],
    });
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
      color: 'white',
      fontWeight: 'bold',
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
      color: 'white',
      fontWeight: 'bold',
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

    const hpDifference = {
      position: 'absolute',
      top: -11,
      left: -20,
      fontSize: 20,
      color: this.state.hpDifference > 0 ? '#00EF31' : 'red',
      zIndex: 1,
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

    const vpDifference = {
      position: 'absolute',
      top: -11,
      left: -20,
      fontSize: 20,
      color: this.state.vpDifference > 0 ? '#EFCA00' : 'red',
      zIndex: 1,
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
      width: this.props.energy[this.props.player] < 20 ? this.props.energy[this.props.player] * 5 + '%' : '100%',
      height: '100%',
      backgroundColor: '#0035CA',
    };

    const energyDifference = {
      position: 'absolute',
      top: -11,
      left: -20,
      fontSize: 20,
      color: this.state.energyDifference > 0 ? '#0035CA' : 'red',
      zIndex: 1,
    };

    const statusText = {
      display: 'table',
      position: 'relative',
      top: -5,
      margin: 'auto',
      color: 'white',
    };

    const cardStyle = {
      width: 30,
      height: 50,
    };

    let avatar = {
      display: 'inline-block',
      float: 'left',
      width: 100,
      height: 100,
      zIndex: -1,
      // backgroundImage: `../../client/images/monster/${this.props.userMonsters[this.props.player]}.png`,
    };

    const temp = {
      float: 'left',
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
    let glowbox;
    if(this.props.player === this.props.currentTurn){
      glowbox = 'glowbox';
    } else {
      glowbox = '';
    }
    let emperor;
    if(this.props.player === this.props.currentEmperor){
      emperor = 'emperor';
      avatar = {};
    } else {
      emperor = '';
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

    let monster_url = `../../client/images/monster/${this.props.userMonsters[this.props.player]}.png`;
    return (
      <div style={divStyle} className={glowbox}>
        <div style={temp}>
          <h5 style={headerStyle}>{this.props.userNicknames[this.props.player]}</h5>

          <div style={statusBox}>
            <p style={textStyle}>HP:</p>
            <div style={hpProgressBar}>
              <ReactCSSTransitionGroup transitionName="hp" transitionEnterTimeout={2000} transitionLeaveTimeout={1}>
                {[<span key={this.state.hpDifference} style={hpDifference}>
                  {this.state.hpDifference !== 0 ? this.state.hpDifference : null}
                </span>]}
              </ReactCSSTransitionGroup>
              <div style={hpBar}>
                <div style={statusText}>{this.props.healthPoints[this.props.player]}</div>
              </div>
            </div>
          </div>

          <div style={statusBox}>
            <p style={textStyle}>VP:</p>
            <div style={vpProgressBar}>
              <ReactCSSTransitionGroup transitionName="vp" transitionEnterTimeout={2000} transitionLeaveTimeout={1}>
                {[<span key={this.state.vpDifference} style={vpDifference}>
                  {this.state.vpDifference !== 0 ? this.state.vpDifference : null}
                </span>]}
              </ReactCSSTransitionGroup>
              <div style={vpBar}>
                <div style={statusText}>{this.props.victoryPoints[this.props.player]}</div>
              </div>
            </div>
          </div>

          <div style={statusBox}>
            <p style={textStyle}>En:</p>
            <div style={energyProgressBar}>
              <ReactCSSTransitionGroup transitionName="energy" transitionEnterTimeout={2000} transitionLeaveTimeout={1}>
                {[<span key={this.state.energyDifference} style={energyDifference}>
                  {this.state.energyDifference !== 0 ? this.state.energyDifference : null}
                </span>]}
              </ReactCSSTransitionGroup>
              <div style={energyBar}>
                <div style={statusText}>{this.props.energy[this.props.player]}</div>
              </div>
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
