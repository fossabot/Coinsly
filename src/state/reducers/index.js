import { combineReducers } from 'redux';
import { USER_LOGOUT } from '../constants';
import loading from './loading';
import menu from './menu';
import coins from './coins';
import user from './user';

const appReducer = combineReducers({
  loading,
  menu,
  coins,
  user
});

const rootReducer = (state, action) => {
  if (action.type === USER_LOGOUT) {
    const { loading } = state;
    state = { loading };
  }

  return appReducer(state, action);
};

export default rootReducer;
