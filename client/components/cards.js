import React from 'react';
import Card from './card_view.js';

export default class Cards extends React.Component {
  constructor(props){
    super(props);
    this.state ={
      card:[{
              name: 'nuclear_powerplant',
              cost: 6,
              discard: true,
            },
            // {
            //   name: 'gas_refinery',
            //   cost: 6,
            //   discard: true,              
            // },
            {
              name: 'rapid_healing',
              cost: 3,
              discard: false,              
            },
            {
              name: 'healing_ray',
              cost: 4,
              discard: false,
            },
            // {
            //   name: 'commuter_train',
            //   cost: 4,
            //   discard: true,
            // }
            ]
    }
  }
  render(){
    const items = this.state.card.map((item)=>{
      return <Card key={item.name} item={item}/>
    });

    const style = {
      position: 'absolute',
      top: 560,
      right: 0,
    };

    return(
      <div style={style}>
        {items}
        {/*Deck image*/}
        <img src="" />
      </div>
    )
  }
}