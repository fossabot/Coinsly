import React from 'react';
import { P } from 'glamorous';

import { spacing } from '../styles';
import LoadingContext from '../context/loadingContext';

const Loading = () => (
  <LoadingContext.Consumer>
    {isLoading => (
      <P
        margin={0}
        position="fixed"
        left={spacing.base}
        top={spacing.base}
        display={!isLoading && 'none'}
      >
        Loading...
      </P>
    )}
  </LoadingContext.Consumer>
);

export default Loading;
