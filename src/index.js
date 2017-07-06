import React from 'react';
import ReactDOM from 'react-dom';
import { red50, red300, red700, redA200 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import registerServiceWorker from './registerServiceWorker';

import injectTapEventPlugin from 'react-tap-event-plugin';

import './index.css';

import App from './App';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: red700,
    primary2Color: red50,
    accent1Color: redA200,
    pickerHeaderColor: red300,
  },
  appBar: {
    height: 50,
  },
});

const WrappedApp = () => (
  <MuiThemeProvider muiTheme={muiTheme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <WrappedApp />,
  document.getElementById('root')
);
registerServiceWorker();
