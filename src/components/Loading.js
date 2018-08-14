import React from 'react';

import loadingSvg from '../assets/loading.svg';
import styles from '../styles/Loading.module.scss';

const Loading = ({ loading }) =>
  loading && (
    <img src={loadingSvg} className={styles.loading} alt="Loading..." />
  );

export default Loading;
