import React from 'react';
import PropTypes from 'prop-types';

import { CoinListItem } from '../styles';
import CoinContext from '../context/coinContext';

const Coin = ({ coin }) => (
  <CoinListItem>
    <h3>{coin.name}</h3>

    <CoinContext.Consumer>
      {handleOwnedChange => (
        <label data-testid="coin-label">
          <input
            type="checkbox"
            checked={coin.ownedId !== undefined}
            onChange={handleOwnedChange}
            value={coin.id}
          />
          I own this
        </label>
      )}
    </CoinContext.Consumer>
  </CoinListItem>
);

Coin.propTypes = {
  coin: PropTypes.object.isRequired
};

export default Coin;
