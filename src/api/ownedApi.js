import { api } from './firebaseApi';

const addOwned = async (coinId, userId) => {
  const owned = await api.collection('owned').add({ userId, coinId });
  return owned.id;
};

const removeOwned = async (coinId, userId) => {
  const ownedRef = await api
    .collection('owned')
    .where('userId', '==', userId)
    .where('coinId', '==', coinId)
    .get();

  ownedRef.forEach(o => o.ref.delete());
};

const getOwned = async userId => {
  const ownedRef = await api
    .collection('owned')
    .where('userId', '==', userId)
    .get();
  const owned = [];

  ownedRef.forEach(o => {
    const { id } = o;
    const { userId, coinId } = o.data();

    owned.push({
      id,
      userId,
      coinId
    });
  });

  return owned;
};

export default {
  addOwned,
  removeOwned,
  getOwned
};
