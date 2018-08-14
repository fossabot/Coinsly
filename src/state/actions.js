
export const IS_LOADING = 'LOADER_IS_LOADING';
export const isLoading = loading => {
  console.log(loading);
  return {
    type: IS_LOADING,
    loading
  };
};
