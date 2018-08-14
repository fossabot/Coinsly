import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/CoinList.module.scss';
import Coin from './Coin';

const CoinList = ({ coins, handleOwnedChange, loading }) =>
  coins.length > 0 ? (
    <fieldset className={styles.coinsListWrapper} disabled={loading}>
      <ul className={styles.coinList}>
        {coins.map(coin => (
          <Coin
            key={coin.id}
            coin={coin}
            handleOwnedChange={handleOwnedChange}
          />
        ))}
      </ul>
    </fieldset>
  ) : (
    <p>No coins found</p>
  );

CoinList.propTypes = {
  coins: PropTypes.array,
  handleOwnedChange: PropTypes.func.isRequired
};

export default CoinList;
