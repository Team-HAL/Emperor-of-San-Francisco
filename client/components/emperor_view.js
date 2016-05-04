import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';


const muiTheme = getMuiTheme({
  palette: {
    accent1Color: deepOrange500,
  },
});

// Current Props: currentUser, stayOrLeave
const EmperorView = (props) => {
  const _leaveTokyo = () => {
    props.socket.emit('leaveTokyo', props.currentUser);
  }
  return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <FlatButton label="Leave Tokyo" disabled={!props.stayOrLeave} onClick={() => { _leaveTokyo(); }} />
      </MuiThemeProvider>
    );
};

export default EmperorView;