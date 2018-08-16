/* global Raven */
import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import LogRocket from 'logrocket';
import setupLogRocketReact from 'logrocket-react';

import store from './store/configureStore';
import history from './store/history';
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
    <ConnectedRouter history={history}>
      <Router>
        <AppContainer />
      </Router>
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root')
);
