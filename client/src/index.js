import React from 'react';
import ReactDOM from 'react-dom';

/**
 * Importação do Materialize CSS
 */

import "../src/css/reset.css";
import "../src/css/style.css";
import "../src/css/materialize.css";
import 'materialize-css/dist/css/materialize.min.css';
import '..src/css/index.css';

import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
