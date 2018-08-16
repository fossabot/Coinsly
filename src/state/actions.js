import { push } from 'connected-react-router';
import qs from 'qs';
import coinApi from '../api/coinApi';
import ownedApi from '../api/ownedApi';
import {
  IS_LOADING,
  MENU_TOGGLE,
  FILTERS_SET_ALL,
  FILTERS_SET_STATUS,
  FILTERS_SET_DENOMINATION,
  COINS_ADD_ALL,
  COINS_ADD_DENOMINATIONS,
  COINS_SET_FILTERED,
  COINS_FILTER,
  COINS_ADD_OWNED,
  COINS_REMOVE_OWNED,
  USER_SET_DETAILS
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

const addAllDenominations = denominations => ({
  type: COINS_ADD_DENOMINATIONS,
  denominations
});

export const setFilteredCoins = coins => ({
  type: COINS_SET_FILTERED,
  coins
});

export const filterCoins = (status, denomination) => ({
  type: COINS_FILTER,
  status,
  denomination
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
export const setUserDetails = user => ({
  type: USER_SET_DETAILS,
  user
});

/**
 * Initial State
 */
export const setInitialState = user => async (dispatch, getState) => {
  dispatch(isLoading(true));

  const coins = await coinApi.getCoins(user.uid);
  const denominations = getDenominations(coins);
  const state = getState();
  const { search } = state.router.location;
  const { statuses } = state.coins;
  const qsFilters = qs.parse(search.slice(1));
  const { denomination = denominations[0], status = statuses[0] } = qsFilters;

  dispatch(setUserDetails(user));
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

/**
 * Helper functions
 */
const getDenominations = coins => [
  ...new Set(
    coins.reduce((prev, coin) => {
      if (coin.denomination) {
        prev.push(coin.denomination);
      }

      return prev;
    }, [])
  )
];