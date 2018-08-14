import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/CoinList.module.scss';
import CoinContainer from '../containers/CoinContainer';

const CoinList = ({ loading, menuOpen, coins, userAuthenticated }) =>
  userAuthenticated ? (
    coins.length > 0 ? (
      <fieldset
        className={`${styles.coinsListWrapper} ${
          menuOpen ? styles.coinsListWrapper__spacingLeft : ''
        }`}
        disabled={loading}
      >
        <ul className={styles.coinList}>
          {coins.map(coin => (
            <CoinContainer key={coin.id} coin={coin} />
          ))}
        </ul>
      </fieldset>
    ) : (
      <p>No coins found</p>
    )
  ) : null;

CoinList.propTypes = {
  loading: PropTypes.bool.isRequired,
  menuOpen: PropTypes.bool.isRequired,
  coins: PropTypes.array.isRequired,
  userAuthenticated: PropTypes.bool.isRequired
};

export default CoinList;
