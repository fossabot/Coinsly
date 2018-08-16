import ownedApi from '../../lib/ownedApi';
import { isLoading } from './loading';
import {
  COINS_ADD_ALL,
  COINS_SET_FILTERED,
  COINS_FILTER,
  COINS_ADD_OWNED,
  COINS_REMOVE_OWNED
} from '../constants';

export const addAllCoins = coins => ({
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
