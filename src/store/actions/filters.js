import { updateUrl } from './router';
import {
  FILTERS_ADD_DENOMINATIONS,
  FILTERS_SET_ALL,
  FILTERS_SET_STATUS,
  FILTERS_SET_DENOMINATION
} from '../constants';

export const addAllDenominations = denominations => ({
  type: FILTERS_ADD_DENOMINATIONS,
  denominations
});

export const setAllFilters = filters => ({
  type: FILTERS_SET_ALL,
  filters
});

const setStatus = status => ({
  type: FILTERS_SET_STATUS,
  status
});

export const updateStatus = ({ target }) => async dispatch => {
  const { value: status } = target;

  dispatch(setStatus(status));
  dispatch(updateUrl());
};

const setDenomination = denomination => ({
  type: FILTERS_SET_DENOMINATION,
  denomination
});

export const updateDenomination = ({ target }) => async dispatch => {
  const { value: denomination } = target;

  dispatch(setDenomination(denomination));
  dispatch(updateUrl());
};
