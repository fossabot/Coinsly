import { api } from './firebaseApi';
import { getOwned } from './ownedApi';

export const addCoin = async coin =>
  await api.collection('coins').add(coin);

export const getCoins = async userId => {
  const coinsRef = await api
    .collection('coins')
    .orderBy('order')
    .get();

  const userOwned = await getOwned(userId);
  const coins = [];

  coinsRef.forEach(coin => {
    const { id } = coin;
    const coinData = coin.data();
    const owned = userOwned.find(o => o.coinId === id);

    coins.push({
      ...coinData,
      id,
      ...(owned && { ownedId: owned.id }),
      owned: owned !== undefined
    });
  });

  return coins;
};
