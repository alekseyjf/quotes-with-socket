import React from 'react';
import ReactDom from 'react-dom';
import {CurrencyProvider} from "./context";

import App from './components/app'

ReactDom.render(
  <CurrencyProvider>
    <App/>
  </CurrencyProvider>
  , document.getElementById('root'));