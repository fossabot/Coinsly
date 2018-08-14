import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import LogRocket from 'logrocket';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';

const store = createStore(
  rootReducer,
  composeWithDevTools(
    applyMiddleware(thunkMiddleware, LogRocket.reduxMiddleware())
  )
);

export default store;
