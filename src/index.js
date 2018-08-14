import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import LogRocket from 'logrocket';

import App from './components/App';

LogRocket.init('u8t5r0/coinsly');
Raven.setDataCallback(data => {
  data.extra.sessionURL = LogRocket.sessionURL;
  return data;
});

render(
  <Router>
    <App />
  </Router>,
  document.getElementById('root')
);
