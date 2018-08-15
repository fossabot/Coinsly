// import { produce } from 'immer';
// import {
//   FILTERS_SET_ALL,
//   FILTERS_SET_STATUS,
//   FILTERS_SET_DENOMINATION
// } from '../actions';

// const initialState = {
//   status: '',
//   statuses: ['All', 'Needed', 'Owned'],
//   denomination: '',
//   denominations: []
// };

// const filters = (state = initialState, action) =>
//   produce(state, draft => {
//     switch (action.type) {
//       case FILTERS_SET_ALL: {
//         const { filters } = action;

//         draft.status = filters.status;
//         draft.denomination = filters.denomination;
//         draft.denominations = filters.denominations;
//         return;
//       }

//       case FILTERS_SET_STATUS: {
//         draft.status = action.status;
//         return;
//       }

//       case FILTERS_SET_DENOMINATION: {
//         draft.denomination = action.denomination;
//         return;
//       }

//       default:
//         return state;
//     }
//   });

// export default filters;
