export const IS_LOADING = 'LOADER_IS_LOADING';
export const isLoading = loading => ({
  type: IS_LOADING,
  loading
});

export const MENU_TOGGLE = 'MENU_TOGGLE';
export const toggleMenu = () => ({
  type: MENU_TOGGLE
});

export const FILTERS_SET_ALL   = 'FILTERS_SET_ALL';
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

export const USER_SET_DETAILS = 'USER_SET_DETAILS';
export const setUserDetails = user => ({
  type: USER_SET_DETAILS,
  user
});
