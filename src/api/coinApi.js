import { api } from './firebaseApi';
import ownedApi from './ownedApi';
import storageApi from './storageApi';

const addCoin = async coin => {
  const imageUrl = await storageApi.getImage(`${coin.denomination}/${coin.imageUrl}`);
  await api.collection('coins').add({ ...coin, imageUrl });
};

const getCoins = async userId => {
  const coinsRef = await api
    .collection('coins')
    .orderBy('order')
    .get();

  const userOwned = await ownedApi.getOwned(userId);
  const coins = [];

  coinsRef.forEach(coin => {
    const { id } = coin;
    const coinData = coin.data();
    const owned = userOwned.find(o => o.coinId === id);

    coins.push({
      ...coinData,
      id,
      owned: !!owned
    });
  });

  return coins;
};

export default {
  addCoin,
  getCoins
};
