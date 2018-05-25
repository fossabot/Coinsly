import React from 'react';
import PropTypes from 'prop-types';

import { TickImage, CoinImg, CoinLabel, CoinListItem } from '../styles';
import coinIcon from '../assets/coin.svg';
import tick from '../assets/tick.svg';

const Coin = ({ coin, handleOwnedChange }) => (
  <CoinListItem owned={coin.owned}>
    <CoinLabel data-testid="coin-label">
      {coin.owned && <TickImage src={tick} alt="" />}


      <CoinImg src={coinIcon} alt="" />

      <h3 data-testid="coin-label">{coin.name}</h3>

      <input
        type="checkbox"
        checked={coin.owned}
        onChange={handleOwnedChange}
        value={coin.id}
        style={{ display: 'none' }}
      />
    </CoinLabel>
  </CoinListItem>
);

Coin.propTypes = {
  coin: PropTypes.object.isRequired,
  handleOwnedChange: PropTypes.func.isRequired
};

export default Coin;
