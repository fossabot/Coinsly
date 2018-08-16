import { updateUrl } from './router';
import {
  FILTERS_ADD_DENOMINATIONS,
  FILTERS_SET_STATUS,
  FILTERS_SET_DENOMINATION,
  FILTERS_APPLY
} from '../constants';

export const addAllDenominations = denominations => ({
  type: FILTERS_ADD_DENOMINATIONS,
  denominations
});

export const setStatus = status => ({
  type: FILTERS_SET_STATUS,
  status
});

export const updateStatus = ({ target }) => dispatch => {
  const { value: status } = target;

  dispatch(setStatus(status));
  dispatch(applyFilters());
  dispatch(updateUrl());
};

export const setDenomination = denomination => ({
  type: FILTERS_SET_DENOMINATION,
  denomination
});

export const updateDenomination = ({ target }) => dispatch => {
  const { value: denomination } = target;

  dispatch(setDenomination(denomination));
  dispatch(applyFilters());
  dispatch(updateUrl());
};

export const applyFilters = () => ({
  type: FILTERS_APPLY
});
