import qs from 'qs';
import coinApi from '../../lib/coinApi';
import coinHelper from '../../lib/coinHelper';
import { isLoading } from './loading';
import { addAllDenominations, setAllFilters } from './filters';
import { addAllCoins, filterCoins } from './coins';
import { addUserDetails } from './user';

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
