import React from 'react';

import { LoadingWrapper } from '../styles';
import LoadingContext from '../context/loadingContext';

const Loading = () => (
  <LoadingContext.Consumer>
    {isLoading => (
      <LoadingWrapper isLoading={isLoading}>Loading...</LoadingWrapper>
    )}
  </LoadingContext.Consumer>
);

export default Loading;
