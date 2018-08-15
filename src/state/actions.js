import * as ownedApi from '../api/ownedApi';

export const IS_LOADING = 'LOADER_IS_LOADING';
export const isLoading = loading => ({
  type: IS_LOADING,
  loading
});

export const MENU_TOGGLE = 'MENU_TOGGLE';
export const toggleMenu = () => ({
  type: MENU_TOGGLE
});

export const FILTERS_SET_ALL = 'FILTERS_SET_ALL';
export const setAllFilters = filters => ({
  type: FILTERS_SET_ALL,
  filters
});

export const FILTERS_SET_STATUS = 'FILTERS_SET_STATUS';
export const setStatus = ({ target }) => ({
  type: FILTERS_SET_STATUS,
  status: target.value
});

export const FILTERS_SET_DENOMINATION = 'FILTERS_SET_DENOMINATION';
export const setDenomination = ({ target }) => ({
  type: FILTERS_SET_DENOMINATION,
  denomination: target.value
});

export const COINS_ADD_ALL = 'COINS_ADD_ALL';
export const addAllCoins = coins => ({
  type: COINS_ADD_ALL,
  coins
});

export const COINS_SET_FILTERED = 'COINS_SET_FILTERED';
export const setFilteredCoins = coins => ({
  type: COINS_SET_FILTERED,
  coins
});

export const COINS_FILTER = 'COINS_FILTER';
export const filterCoins = (status, denomination) => ({
  type: COINS_FILTER,
  status,
  denomination
});

export const COINS_ADD_OWNED = 'COINS_ADD_OWNED';
export const addOwnedCoin = coinId => ({
  type: COINS_ADD_OWNED,
  coinId
});

export const COINS_REMOVE_OWNED = 'COINS_REMOVE_OWNED';
export const removeOwnedCoin = coinId => ({
  type: COINS_REMOVE_OWNED,
  coinId
});

export const USER_SET_DETAILS = 'USER_SET_DETAILS';
export const setUserDetails = user => ({
  type: USER_SET_DETAILS,
  user
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
