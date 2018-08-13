const isNeeded = coin => coin.ownedId === undefined;

const isOwned = coin => coin.ownedId !== undefined;

const isDenomination = (coin, denomination) => coin.denomination === denomination;

const filterByDenomination = (coins, denomination) =>
  coins.filter(coin => isDenomination(coin, denomination));

const showCoin = (coin, filter, denomination) => {
  const isDenom = isDenomination(coin, denomination);
  if (!isDenom) return false;

  switch (filter) {
    case 'Needed':
      return isNeeded(coin);
    case 'Owned':
      return isOwned(coin);
    default:
      return true;
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

  if (!coin) return [...coins];

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
  filterByDenomination,
  showCoin,
  addOwnedId,
  removeOwnedId,
  getDenominations
};
