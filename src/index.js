/* global Raven */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import App from './components/App';

if (process.env.NODE_ENV === 'production') {
  LogRocket.init('u8t5r0/coinsly');
  setupLogRocketReact(LogRocket);
  Raven.setDataCallback(data => {
    data.extra.sessionURL = LogRocket.sessionURL;
    return data;
  });
}

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
