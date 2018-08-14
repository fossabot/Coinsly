import { api } from './firebaseApi';
import { getOwned } from './ownedApi';
import { getImage } from './storageApi';

export const addCoin = async coin => {
  const imageUrl = await getImage(`${coin.denomination}/${coin.imageUrl}`);
  await api.collection('coins').add({ ...coin, imageUrl });
};

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
