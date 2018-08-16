import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import LogRocket from 'logrocket';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import rootReducer from './reducers';
import history from './history';

const store = createStore(
  connectRouter(history)(rootReducer),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      LogRocket.reduxMiddleware()
    )
  )
);

export default store;
