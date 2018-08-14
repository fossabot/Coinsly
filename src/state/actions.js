import { push } from 'connected-react-router';
import qs from 'qs';
import LogRocket from 'logrocket';
import authApi from '../lib/authApi';
import coinApi from '../lib/coinApi';
import ownedApi from '../lib/ownedApi';
import coinHelper from '../lib/coinHelper';
import {
  IS_LOADING,
  MENU_TOGGLE,
  FILTERS_ADD_DENOMINATIONS,
  FILTERS_SET_ALL,
  FILTERS_SET_STATUS,
  FILTERS_SET_DENOMINATION,
  COINS_ADD_ALL,
  COINS_SET_FILTERED,
  COINS_FILTER,
  COINS_ADD_OWNED,
  COINS_REMOVE_OWNED,
  USER_SET_DETAILS,
  USER_LOGOUT
} from './constants';

/**
 * Loading
 */
export const isLoading = loading => ({
  type: IS_LOADING,
  loading
});

/**
 * Menu
 */
export const toggleMenu = () => ({
  type: MENU_TOGGLE
});

/**
 * Filters
 */
const addAllDenominations = denominations => ({
  type: FILTERS_ADD_DENOMINATIONS,
  denominations
});

export const setAllFilters = filters => ({
  type: FILTERS_SET_ALL,
  filters
});

export const setStatus = ({ target }) => ({
  type: FILTERS_SET_STATUS,
  status: target.value
});

export const setDenomination = ({ target }) => ({
  type: FILTERS_SET_DENOMINATION,
  denomination: target.value
});

/**
 * Coins
 */
const addAllCoins = coins => ({
  type: COINS_ADD_ALL,
  coins
});

export const setFilteredCoins = coins => ({
  type: COINS_SET_FILTERED,
  coins
});

export const filterCoins = () => ({
  type: COINS_FILTER
});

export const addOwnedCoin = coinId => ({
  type: COINS_ADD_OWNED,
  coinId
});

export const removeOwnedCoin = coinId => ({
  type: COINS_REMOVE_OWNED,
  coinId
});

export const setOwnedValue = ({ target }) => async (dispatch, getState) => {
  dispatch(isLoading(true));

  const { checked, value: coinId } = target;
  const { user } = getState();

  if (checked) {
    await ownedApi.addOwned(coinId, user.uid);
    dispatch(addOwnedCoin(coinId));
  } else {
    await ownedApi.removeOwned(coinId, user.uid);
    dispatch(removeOwnedCoin(coinId));
  }

  dispatch(filterCoins());
  dispatch(isLoading(false));
};

/**
 * User
 */
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

/**
 * Initial State
 */
export const setInitialState = user => async (dispatch, getState) => {
  dispatch(isLoading(true));

  const coins = await coinApi.getCoins(user.uid);
  const denominations = coinHelper.getDenominations(coins);
  const state = getState();
  const { search } = state.router.location;
  const { statuses } = state.coins;
  const qsFilters = qs.parse(search.slice(1));
  const { denomination = denominations[0], status = statuses[0] } = qsFilters;

  dispatch(addUserDetails(user));
  dispatch(addAllCoins(coins));
  dispatch(addAllDenominations(denominations));
  dispatch(setAllFilters({ status, denomination }));
  dispatch(filterCoins());
  dispatch(isLoading(false));
};

/**
 * Router
 */
export const updateUrl = () => (dispatch, getState) => {
  const { status, denomination } = getState();
  const search = qs.stringify({ status, denomination });

  dispatch(push({ search }));
};
