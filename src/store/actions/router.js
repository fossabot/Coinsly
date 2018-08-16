import { push } from 'connected-react-router';
import qs from 'qs';

export const updateUrl = () => (dispatch, getState) => {
  const { status, denomination } = getState().coins;
  const search = qs.stringify({ status, denomination });

  dispatch(push({ search }));
};
