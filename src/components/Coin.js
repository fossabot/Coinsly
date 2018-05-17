import React from 'react';
import PropTypes from 'prop-types';

import CoinContext from '../context/coinContext';

import { CoinImg, CoinLabel, CoinListItem } from '../styles';
import coinIcon from '../assets/coin.svg';

const Coin = ({ coin }) => (
  <CoinListItem owned={coin.owned}>
    <CoinLabel data-testid="coin-label">
      <CoinImg src={coinIcon} alt=""  />

      <h3 data-testid="coin-label">{coin.name}</h3>

      <CoinContext.Consumer>
        {handleOwnedChange => (
          <input
            type="checkbox"
            checked={coin.owned}
            onChange={handleOwnedChange}
            value={coin.id}
            style={{ display: 'none' }}
          />
        )}
      </CoinContext.Consumer>
    </CoinLabel>
  </CoinListItem>
);

Coin.propTypes = {
  coin: PropTypes.object.isRequired
};

export default Coin;
