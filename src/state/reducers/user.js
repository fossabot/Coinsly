import { USER_SET_DETAILS } from '../actions';

const user = (state = {}, action) => {
  switch (action.type) {
    case USER_SET_DETAILS: {
      return action.user;
    }

    default:
      return state;
  }
};

export default user;
