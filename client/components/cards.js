import React from 'react';
import Card from './card_view.js';

export default class Cards extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      card_name:[]
    }
  }
  render(){
    return(
      <div>
        this is CardsView
        <Card />
        <img src="" />
      </div>
    )
  }
}