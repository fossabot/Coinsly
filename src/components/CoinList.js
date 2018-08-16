import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/CoinList.module.scss';
import CoinContainer from '../containers/CoinContainer';

const CoinList = ({ coins, loading }) =>
  coins.length > 0 ? (
    <fieldset className={styles.coinsListWrapper} disabled={loading}>
      <ul className={styles.coinList}>
        {coins.map(coin => (
          <CoinContainer key={coin.id} coin={coin} />
        ))}
      </ul>
    </fieldset>
  ) : (
    <p>No coins found</p>
  );

CoinList.propTypes = {
  coins: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

export default CoinList;
