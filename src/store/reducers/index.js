import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { USER_LOGOUT } from '../constants';
import loading from './loading';
import menu from './menu';
import coins from './coins';
import user from './user';

const createRootReducer = history => (state, action) => {
  if (action.type === USER_LOGOUT) {
    const { loading } = state;
    console.log('hit');
    state = { loading };
  }

  return createAppReducer(history)(state, action);
};

const createAppReducer = history => combineReducers({
  router: connectRouter(history),
  loading,
  menu,
  coins,
  user
});

export default createRootReducer;
