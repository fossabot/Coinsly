import React from 'react';
import PropTypes from 'prop-types';
import Coin from './Coin';

const filterNeeded = (coins, owned) =>
  coins.filter(c => owned.find(o => o.coinId === c.id) === undefined);

const filterOwned = (coins, owned) =>
  coins.filter(c => owned.find(o => o.coinId === c.id) !== undefined);

const filterCoins = (filter, coins, owned) => {
  switch (filter) {
    case 'onlyNeeded':
      return filterNeeded(coins, owned);
    case 'onlyOwned':
      return filterOwned(coins, owned);
    default:
      return coins;
  }
};

const CoinList = ({
  coins,
  owned,
  filter,
  handleOwnedChange,
  handleSubmit
}) => {
  const filtered = filterCoins(filter, coins, owned);

  return filtered.length > 0 ? (
    <form onSubmit={handleSubmit}>
      <ul>
        {filtered.map(coin => (
          <Coin
            key={coin.id}
            coin={coin}
            owned={owned}
            handleOwnedChange={handleOwnedChange}
          />
        ))}
      </ul>

      <button type="submit">Submit</button>
    </form>
  ) : (
    <p>No coins found</p>
  );
};

CoinList.propTypes = {
  coins: PropTypes.array,
  owned: PropTypes.array,
  filter: PropTypes.string.isRequired,
  handleOwnedChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired
};

CoinList.defaultProps = {
  coins: [],
  owned: []
};

export default CoinList;
