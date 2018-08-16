import LogRocket from 'logrocket';
import authApi from '../../lib/authApi';
import { setInitialState } from './';
import { isLoading } from './loading';
import { USER_SET_DETAILS, USER_LOGOUT } from '../constants';

export const addUserDetails = user => ({
  type: USER_SET_DETAILS,
  user
});

const logoutUser = () => ({
  type: USER_LOGOUT
});

export const onAuthChanged = () => dispatch => {
  authApi.auth.onAuthStateChanged(async user => {
    if (user) {
      dispatch(setInitialState(user));

      if (process.env.NODE_ENV === 'production') {
        LogRocket.identify(user.uid, {
          name: user.displayName,
          email: user.email
        });
      }
    }
  });
};

export const login = user => async dispatch => {
  dispatch(isLoading(true));
  await authApi.login();
  dispatch(isLoading(false));
};

export const logout = () => async dispatch => {
  dispatch(isLoading(true));
  await authApi.logout();
  dispatch(logoutUser());
  dispatch(isLoading(false));
};
