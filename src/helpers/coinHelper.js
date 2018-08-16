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

export default {
  filterCoins,
  filterByDenomination
};
