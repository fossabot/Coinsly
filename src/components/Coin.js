import React from 'react';
import PropTypes from 'prop-types';

const Coin = ({ coin, owned, handleOwnedChange }) => (
  <li>
    <label data-testid="coin-label">
      <input
        type="checkbox"
        checked={owned.find(o => o.coinId === coin.id) !== undefined}
        onChange={handleOwnedChange}
        value={coin.id}
      />
      {coin.name}
    </label>
  </li>
);

Coin.propTypes = {
  coin: PropTypes.object.isRequired,
  owned: PropTypes.array,
  handleOwnedChange: PropTypes.func.isRequired
};

Coin.defaultProps = {
  owned: []
};

export default Coin;
