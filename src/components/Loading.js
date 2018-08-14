import React from 'react';
import PropTypes from 'prop-types';

import loadingSvg from '../assets/loading.svg';
import styles from '../styles/Loading.module.scss';

const Loading = ({ loading }) =>
  loading && (
    <img src={loadingSvg} className={styles.loading} alt="Loading..." />
  );

Loading.propTypes = {
  loading: PropTypes.bool.isRequired
};

export default Loading;
