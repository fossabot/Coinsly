import { IS_LOADING } from '../actions';

const loading = (state = true, action) => {
  switch (action.type) {
    case IS_LOADING: {
      return action.loading;
    }

    default:
      return state;
  }
};

export default loading;
