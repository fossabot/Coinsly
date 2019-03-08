import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { routerMiddleware } from 'connected-react-router';
import LogRocket from 'logrocket';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createRootReducer from './reducers';
import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();

const store = createStore(
  createRootReducer(history),
  composeWithDevTools(
    applyMiddleware(
      routerMiddleware(history),
      thunkMiddleware,
      LogRocket.reduxMiddleware()
    )
  )
);

export default store;
