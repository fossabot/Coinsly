/* global Raven */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import store from './state/configureStore';
import AppContainer from './containers/AppContainer';

if (process.env.NODE_ENV === 'production') {
  LogRocket.init('u8t5r0/coinsly');
  setupLogRocketReact(LogRocket);
  Raven.setDataCallback(data => {
    data.extra.sessionURL = LogRocket.sessionURL;
    return data;
  });
}

render(
  <Provider store={store}>
    <Router>
      <AppContainer />
    </Router>
  </Provider>,
  document.getElementById('root')
);
