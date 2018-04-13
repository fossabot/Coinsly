import { db } from './firebaseService';

export const addCoin = async ({ denomination, name, year, order }) => {
  const result = await db
    .collection('coins')
    .add({ denomination, name, year, order });

  return result.id;
};

export const getCoins = async () => {
  const coinsRef = await db
    .collection('coins')
    .orderBy('order')
    .get();
  const coins = [];

  coinsRef.forEach(coin => {
    const { id } = coin;
    const { denomination, name, year } = coin.data();

    coins.push({
      id,
      denomination,
      name,
      year
    });
  });

  return coins;
};
