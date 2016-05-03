import React from 'react';
import Dice from './dice.js'

export default class Dices extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      diceArr: [1,1,1,1,1,1]
    }
  }
  render(){
    const items = this.state.diceArr.map((num,index)=>{
      return <Dice key={index} random={num} ref={index}/>
    })
    return (
      <div>
        {items}
        <button onClick={()=>{
            for(var i = 0; i<this.state.diceArr.length;i++){
              this.refs[i].roll();              
            }
          }}>Roll dice!</button>
      </div>
    )
  }
}
