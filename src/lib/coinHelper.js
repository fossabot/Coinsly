const filterByDenomination = (coins, denomination) =>
  coins.filter(coin => coin.denomination === denomination);

const filterCoins = (coins, filter, denomination) => {
  const byDenomination = filterByDenomination(coins, denomination);

  switch (filter) {
    case 'Needed':
      return byDenomination.filter(coin => !coin.owned);
    case 'Owned':
      return byDenomination.filter(coin => coin.owned);
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
