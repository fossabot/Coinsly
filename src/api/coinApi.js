import { api } from './firebaseApi';
import { getOwned } from './ownedApi';

export const addCoin = async ({ denomination, name, year, order }) =>
  await api.collection('coins').add({ denomination, name, year, order });

export const getCoins = async userId => {
  const coinsRef = await api
    .collection('coins')
    .orderBy('order')
    .get();

  const userOwned = await getOwned(userId);
  const coins = [];

  coinsRef.forEach(coin => {
    const { id } = coin;
    const { denomination, name, year } = coin.data();
    const owned = userOwned.find(o => o.coinId === id);

    coins.push({
      id,
      denomination,
      name,
      year,
      ...(owned && { ownedId: owned.id }),
      owned: owned !== undefined
    });
  });

  return coins;
};
