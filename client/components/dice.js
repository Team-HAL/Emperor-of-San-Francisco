import React from 'react';

export default class Dice extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      keep: false,
      number: 1
    }
  }
  componentDidMount(){
    this.roll();
  }
  roll(){
    if(this.state.keep === false){
      this.setState({number:Math.ceil(Math.random()*6)})      
    }
  }
  render(){
    let image = `../../client/images/${this.state.number}.png`
    return <img 
              src= {image} 
              onClick={()=>{
                if (this.state.number<=6){
                  this.setState({keep:true, 
                    number:this.state.number+6
                    });                  
                } else {
                  this.setState({keep:false, 
                    number:this.state.number-6
                    });                                    
                }
              }}
            />
  }
}
