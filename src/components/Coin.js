import React from 'react';
import PropTypes from 'prop-types';

import { TickImage, CoinImg, CoinLabel, CoinListItem } from '../styles';
import tick from '../assets/tick.svg';

const Coin = ({ coin, show, handleOwnedChange }) => (
  <CoinListItem owned={coin.owned} show={show}>
    <CoinLabel data-testid="coin-label">
      {coin.owned && <TickImage src={tick} alt="" />}

      <CoinImg src={coin.imageUrl} alt="" owned={coin.owned} />

      <h3 data-testid="coin-label">{coin.years[0]}</h3>

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
  show: PropTypes.bool,
  handleOwnedChange: PropTypes.func.isRequired
};

export default Coin;
