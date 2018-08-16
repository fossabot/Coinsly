import { produce } from 'immer';
import {
  FILTERS_ADD_DENOMINATIONS,
  FILTERS_SET_STATUS,
  FILTERS_SET_DENOMINATION,
  FILTERS_APPLY,
  COINS_ADD_ALL,
  COINS_SET_FILTERED,
  COINS_ADD_OWNED,
  COINS_REMOVE_OWNED
} from '../constants';
import coinHelper from '../../lib/coinHelper';

const coins = (
  state = {
    status: '',
    statuses: ['All', 'Needed', 'Owned'],
    denomination: '',
    denominations: [],
    allCoins: [],
    filteredCoins: []
  },
  action
) =>
  produce(state, draft => {
    switch (action.type) {
      case FILTERS_ADD_DENOMINATIONS: {
        draft.denominations = action.denominations;
        return;
      }

      case FILTERS_SET_STATUS: {
        draft.status = action.status;
        return;
      }

      case FILTERS_SET_DENOMINATION: {
        draft.denomination = action.denomination;
        return;
      }

      case FILTERS_APPLY: {
        draft.filteredCoins = coinHelper.filterCoins(
          state.allCoins,
          state.status,
          state.denomination
        );
        return;
      }

      case COINS_ADD_ALL: {
        draft.allCoins = action.coins;
        return;
      }

      case COINS_SET_FILTERED: {
        draft.filteredCoins = action.coins;
        return;
      }

      case COINS_ADD_OWNED: {
        const coin = draft.allCoins.find(c => c.id === action.coinId);

        if (coin) {
          coin.owned = true;
        }

        return;
      }

      case COINS_REMOVE_OWNED: {
        const coin = draft.allCoins.find(c => c.id === action.coinId);

        if (coin) {
          coin.owned = false;
        }

        return;
      }

      default:
        return state;
    }
  });

export default coins;
