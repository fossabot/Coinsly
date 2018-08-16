import { IS_LOADING } from '../constants';

export const isLoading = loading => ({
  type: IS_LOADING,
  loading
});
