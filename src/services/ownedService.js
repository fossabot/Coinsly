import { db } from './firebaseService';

export const addOwned = async (userId, coinId) => {
  const owned = await db.collection('owned').add({ userId, coinId });
  return owned.id;
};

export const getOwned = async userId => {
  const ownedRef = await db
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

export const removeOwned = async (userId, coinId) => {
  const ownedRef = await db
    .collection('owned')
    .where('userId', '==', userId)
    .where('coinId', '==', coinId)
    .get();

  ownedRef.forEach(o => o.ref.delete());
};
