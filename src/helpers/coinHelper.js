const filterNeeded = coins => coins.filter(coin => !coin.owned);

const filterOwned = coins => coins.filter(coin => coin.owned);

const filterByDenomination = (coins, denomination) =>
  coins.filter(coin => coin.denomination === denomination);

const filterCoins = (coins, filter, denomination) => {
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
  getDenominations
};
