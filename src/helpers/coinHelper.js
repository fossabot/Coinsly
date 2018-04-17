const filterNeeded = coins => coins.filter(coin => coin.ownedId === undefined);

const filterOwned = coins => coins.filter(coin => coin.ownedId !== undefined);

const filterByDenomination = (coins, denomination) =>
  coins.filter(coin => coin.denomination === denomination);

const filterCoins = (filter, coins, denomination) => {
  const byDenomination = coins.filter(
    coin => coin.denomination === denomination
  );

  switch (filter) {
    case 'Needed':
      return filterNeeded(byDenomination);
    case 'Owned':
      return filterOwned(byDenomination);
    default:
      return [...byDenomination];
  }
};

const addOwnedId = (coins, coinId, ownedId) => {
  const coinsCopy = [...coins];
  const coin = coinsCopy.find(c => c.id === coinId);

  if (coin) {
    coin.ownedId = ownedId;
  }

  return coinsCopy;
};

const removeOwnedId = (coins, coinId) => {
  const coinsCopy = [...coins];
  const coin = coinsCopy.find(c => c.id === coinId);

  // Returns a new object called `newCoin` which is a copy of `coin` without the `ownedId` property
  const { ownedId, ...newCoin } = coin;
  const index = coinsCopy.findIndex(c => c.id === coinId);

  coinsCopy[index] = newCoin;

  return coinsCopy;
};

const getDenominations = coins => [
  ...new Set(coins.map(coin => coin.denomination))
];

export default {
  filterCoins,
  filterByDenomination,
  addOwnedId,
  removeOwnedId,
  getDenominations
};
