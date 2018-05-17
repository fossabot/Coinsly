const filterNeeded = coins => coins.filter(coin => coin.ownedId === undefined);

const filterOwned = coins => coins.filter(coin => coin.ownedId !== undefined);

const filterByDenomination = (coins, denomination) =>
  coins.filter(coin => coin.denomination === denomination);

const filterCoins = (filter, coins, denomination) => {
  const byDenomination = filterByDenomination(coins, denomination);

  switch (filter) {
    case 'Needed':
      return filterNeeded(byDenomination);
    case 'Owned':
      return filterOwned(byDenomination);
    default:
      return byDenomination;
  }
};

const addOwnedId = (coins, coinId, ownedId) => {
  const coinsCopy = [...coins];
  const coin = coinsCopy.find(c => c.id === coinId);

  if (coin) {
    coin.ownedId = ownedId;
    coin.owned = true;
  }

  return coinsCopy;
};

const removeOwnedId = (coins, coinId) => {
  const coin = coins.find(c => c.id === coinId);
  // Returns a new object called `newCoin` which is a copy of `coin` without the `ownedId` property
  const { ownedId, ...newCoin } = coin;
  newCoin.owned = false;
  const index = coins.findIndex(c => c.id === coinId);
  const coinsCopy = [...coins];

  coinsCopy[index] = newCoin;

  return coinsCopy;
};

const getDenominations = coins => [
  ...new Set(
    coins.reduce((prev, coin) => {
      if (coin.denomination) {
        prev.push(coin.denomination);
      }

      return prev;
    }, [])
  )
];

export default {
  filterCoins,
  filterByDenomination,
  addOwnedId,
  removeOwnedId,
  getDenominations
};
