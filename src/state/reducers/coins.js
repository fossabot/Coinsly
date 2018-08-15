import { produce } from 'immer';
import { COINS_ADD_ALL, COINS_SET_FILTERED } from '../actions';

const initialState = {
  allCoins: [],
  filteredCoins: []
};

const coins = (state = initialState, action) =>
  produce(state, draft => {
    switch (action.type) {
      case COINS_ADD_ALL: {
        draft.allCoins = action.coins;
        return;
      }

      case COINS_SET_FILTERED: {
        draft.filteredCoins = action.coins;
        return;
      }

      default:
        return state;
    }
  });

export default coins;
