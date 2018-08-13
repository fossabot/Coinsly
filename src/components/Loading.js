import React from 'react';

import LoadingContext from '../context/loadingContext';
import loadingSvg from '../assets/loading.svg';
import { loading } from '../styles/Loading.module.scss';

const Loading = () => (
  <LoadingContext.Consumer>
    {isLoading => isLoading && <img src={loadingSvg} className={loading} alt="Loading..." />}
  </LoadingContext.Consumer>
);

export default Loading;
