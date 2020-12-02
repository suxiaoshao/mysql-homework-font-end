import ReactDOM from 'react-dom';
import App from './app';
import React from 'react';
import 'fontsource-roboto';
import MyRecord from './components/remind';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);
ReactDOM.render(
  <React.StrictMode>
    <MyRecord />
  </React.StrictMode>,
  document.getElementById('message'),
);
