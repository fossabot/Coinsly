import { combineReducers } from 'redux';
import loading from './loading';
import menu from './menu';
import filters from './filters';
import coins from './coins';
import user from './user';

const appReducer = combineReducers({
  loading,
  menu,
  filters,
  coins,
  user
});

const rootReducer = (state, action) => {
  if (action.type === 'USER_LOGOUT') {
    const { loading } = state;
    state = { loading };
  }

  return appReducer(state, action);
};

export default rootReducer;
