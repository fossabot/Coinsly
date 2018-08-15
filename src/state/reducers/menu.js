import { produce } from 'immer';
import { MENU_TOGGLE } from '../actions';

const menu = (state = { isOpen: false }, action) =>
  produce(state, draft => {
    switch (action.type) {
      case MENU_TOGGLE: {
        draft.isOpen = !draft.isOpen;
        return;
      }

      default:
        return state;
    }
  });

export default menu;
