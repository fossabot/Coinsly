export const IS_LOADING = 'LOADER_IS_LOADING';
export const isLoading = loading => ({
  type: IS_LOADING,
  loading
});

export const FILTERS_SET_ALL = 'FILTERS_SET_ALL';
export const setAllFilters = ({ status, denomination, denominations }) => ({
  type: FILTERS_SET_ALL,
  status,
  denomination,
  denominations
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
