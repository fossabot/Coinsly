import { produce } from 'immer';
import {
  FILTERS_SET_ALL,
  FILTERS_SET_STATUS,
  FILTERS_SET_DENOMINATION,
  COINS_ADD_ALL,
  COINS_ADD_DENOMINATIONS,
  COINS_SET_FILTERED,
  COINS_FILTER,
  COINS_ADD_OWNED,
  COINS_REMOVE_OWNED
} from '../actions';
import coinHelper from '../../helpers/coinHelper';

const initialState = {
  status: '',
  statuses: ['All', 'Needed', 'Owned'],
  denomination: '',
  denominations: [],
  allCoins: [],
  filteredCoins: []
};

const coins = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case FILTERS_SET_ALL: {
        const { filters } = action;

        draft.status = filters.status;
        draft.denomination = filters.denomination;
        return;
      }

      case FILTERS_SET_STATUS: {
        draft.status = action.status;

        draft.filteredCoins = coinHelper.filterCoins(
          state.allCoins,
          action.status,
          state.denomination
        );

        return;
      }

      case FILTERS_SET_DENOMINATION: {
        draft.denomination = action.denomination;

        draft.filteredCoins = coinHelper.filterCoins(
          state.allCoins,
          state.status,
          action.denomination
        );
        return;
      }

      case COINS_ADD_ALL: {
        draft.allCoins = action.coins;
        return;
      }

      case COINS_ADD_DENOMINATIONS: {
        draft.denominations = action.denominations;
        return;
      }

      case COINS_SET_FILTERED: {
        draft.filteredCoins = action.coins;
        return;
      }

      case COINS_FILTER: {
        draft.filteredCoins = coinHelper.filterCoins(
          state.allCoins,
          state.status,
          state.denomination
        );
        return draft;
      }

      case COINS_ADD_OWNED: {
        const coin = draft.allCoins.find(c => c.id === action.coinId);

        if (coin) {
          coin.owned = true;
        }

        return draft;
      }

      case COINS_REMOVE_OWNED: {
        const coin = draft.allCoins.find(c => c.id === action.coinId);

        if (coin) {
          coin.owned = false;
        }

        // if (!coin) return draft;

        // const index = draft.allCoins.findIndex(c => c.id === coinId);

        // draft.allCoins[index] = coin;

        return draft;
      }

      default:
        return state;
    }
  });

export default coins;
