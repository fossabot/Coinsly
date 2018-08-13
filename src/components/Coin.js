import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/Coin.module.scss';
import tick from '../assets/tick.svg';

const Coin = ({ coin, handleOwnedChange }) => (
  <li className={`${styles.coin} ${coin.owned ? styles.coin__owned : ''}`}>
    <label className={styles.label} data-testid="coin-label">
      {coin.owned && <img className={styles.tick} src={tick} alt="" />}

      <img className={styles.image} src={coin.imageUrl} alt="" />

      <input
        className={styles.input}
        type="checkbox"
        checked={coin.owned}
        onChange={handleOwnedChange}
        value={coin.id}
      />
    </label>
  </li>
);

Coin.propTypes = {
  coin: PropTypes.object.isRequired,
  handleOwnedChange: PropTypes.func.isRequired
};

export default Coin;
