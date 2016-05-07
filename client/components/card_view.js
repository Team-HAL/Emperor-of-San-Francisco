import React from 'react';

export default class Card extends React.Component {
  constructor(props){
    super(props);
  };

  render(){
    let img = `../../client/images/cards/${this.props.item.name}.jpeg`;
    
    const style = {
      width: 168,
      height: 240,
      margin: 5,
      borderRadius: 10,
    };

    return(
      <img style={style} src={img}/>
    )
  }
}