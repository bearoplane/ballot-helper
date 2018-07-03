import React from 'react';
import ReactDOM from 'react-dom';

import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'

import registerServiceWorker from './registerServiceWorker';

import './index.css';

import App from './App';

const theme = createMuiTheme()

const WrappedApp = () => (
  <MuiThemeProvider theme={theme}>
    <App />
  </MuiThemeProvider>
);

ReactDOM.render(
  <WrappedApp />,
  document.getElementById('root')
);
registerServiceWorker();
