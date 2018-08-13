import React from 'react';
import PropTypes from 'prop-types';

import styles from '../styles/CoinList.module.scss';
import LoadingContext from '../context/loadingContext';
import Coin from './Coin';

const CoinList = ({ coins, handleOwnedChange }) =>
  coins.length > 0 ? (
    <LoadingContext.Consumer>
      {isLoading => (
        <fieldset className={styles.coinsListWrapper} disabled={isLoading}>
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
      )}
    </LoadingContext.Consumer>
  ) : (
    <p>No coins found</p>
  );

CoinList.propTypes = {
  coins: PropTypes.array,
  handleOwnedChange: PropTypes.func.isRequired
};

export default CoinList;
