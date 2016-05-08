import React from 'react';
// import EmperorView from './emperor_view';

// import FlatButton from 'material-ui/FlatButton';
// import getMuiTheme from 'material-ui/styles/getMuiTheme';
// import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
// import {deepOrange500} from 'material-ui/styles/colors';


const PlayerActions = (props) => {
  const _attackAll = (dmg) => {
    let data = {
      damage: dmg,
      otherPlayers: props.otherPlayers,
      currentUser: props.player,
    }
    props.socket.emit('attackAll', data);
  }

  const _increaseVP = (num) => {
    props.socket.emit('increaseVP', num);
  }

  const _endTurn = () => {
    let data = {}
    props.diceArray.forEach((item)=>{
      if(item >6){
        item = item - 6;        
      } 
      if(data[item]){
        data[item]++;
      } else {
        data[item] = 1;
      }
    });
    props.socket.emit('endTurn', data);
  }

  const _currentUserTurn = () => {
    return !(props.currentTurn === props.player);
  };

  const _leaveTokyo = () => {
    props.socket.emit('leaveTokyo', props.player);
  };

  const divStyle = {
    display: 'table',
    float: 'left',
    clear: 'right',
    position: 'relative',
    top: 0,
    left: 0,
    margin: '10px 0px',
    padding: 0,
  };

  // const headerStyle = {
  //   margin: 0,
  //   fontSize: 13,
  // };
  // <h5 style={headerStyle}>Player Actions</h5>

  const buttonStyle = {
    display: 'block',
    width: 85,
    padding: '0px 2px',
    margin: '0px auto',
  };

  return (
    <div style={divStyle}>
      <button
        className="btn btn-danger"
        style={buttonStyle}
        onClick={() => { _attackAll(1); }}
        disabled={_currentUserTurn()}
      >
        Attack All
      </button>

      <button
        className="btn btn-primary"
        style={buttonStyle}
        onClick={() => { _increaseVP(1); }}
        disabled={_currentUserTurn()}
      >
        Increase VP
      </button>

      <button
        className="btn btn-info"
        style={buttonStyle}
        onClick={() => { _endTurn(); }}
        disabled={_currentUserTurn()}
      >
        End Turn
      </button>

      <button
        className="btn btn-primary"
        style={buttonStyle}
        disabled={!props.stayOrLeave}
        onClick={() => { _leaveTokyo(); }}
      >
        Leave SF
      </button>
    </div>
  );
};

export default PlayerActions;

// Refactor this.
//   const muiTheme = getMuiTheme({
//     palette: {
//       accent1Color: deepOrange500,
//     },
//   });

//   return (
//     <MuiThemeProvider muiTheme={muiTheme}>
//       <div>
//         Player Actions
//         <li>
//           <FlatButton
//             onClick={ () => { _attackAll(1); }}
//             label="Attack All"
//             disabled={_currentUserTurn()}
//           />
//         </li>

//         <li>
//           <FlatButton
//             onClick={ () => { _increaseVP(1); }}
//             label="Increase current user Victory Points"
//             disabled={_currentUserTurn()}
//           />
//         </li>

//         <li>
//           <FlatButton
//             className="btn btn-primary"
//             onClick={ () => { _endTurn(); }}
//             label="End Turn"
//             disabled={_currentUserTurn()}
//           />
//         </li>
//         <EmperorView
//           currentUser={props.player}
//           stayOrLeave={props.stayOrLeave}
//           socket={props.socket}
//         />

//       </div>
//     </MuiThemeProvider>
//   );
// };
