import React from 'react';

export default class Dice extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      keep: false,
      number: 1,
    };
  }
  roll() {
    if (this.state.keep === false) {
      let die = (Math.ceil(Math.random() * 6));
      this.setState({ number: die });
      return die;
    }
    return this.state.number;
  }
  render() {
    const style = {
      borderRadius: 8,
      width: 50,
      height: 50,
      margin: '1px 1px',
    };

    let image = `../../client/images/dice/${this.state.number}.jpeg`;

    return (
      <img
        style={style}
        src={image}
        onClick={() => {
          if (this.state.number <= 6) {
            this.setState({
              keep: true,
              number: this.state.number + 6,
            });
          } else {
            this.setState({
              keep: false,
              number: this.state.number - 6,
            });
          }
        }}
      />
    );
  }
}
