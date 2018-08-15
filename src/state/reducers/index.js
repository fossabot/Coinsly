import { combineReducers } from 'redux';
import loading from './loading';
import menu from './menu';
import filters from './filters';

export default combineReducers({
  loading,
  menu,
  filters
});
