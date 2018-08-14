import { combineReducers } from 'redux';
import loading from './loading';
import filters from './filters';

export default combineReducers({
  loading,
  filters
});
