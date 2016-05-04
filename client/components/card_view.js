import React from 'react';

export default class Card extends React.Component {
  constructor(props){
    super(props);
  }
  render(){
    let img = `../../client/images/cards/${this.props.item.name}.jpeg`;
    return(
      <img className="card" src={img}/>
    )
  }
}