import { db } from './firebaseService';

export const shapeUser = user => {
  const { uid: userId, displayName, email, photoURL, metadata } = user;
  const { creationTime, lastSignInTime } = metadata;
  const appUser = {
    userId,
    displayName,
    email,
    photoURL,
    creationTime,
    lastSignInTime
  };
  return appUser;
};

export const updateUser = async user => {
  const appUser = shapeUser(user);

  await db
    .collection('users')
    .doc(user.userId)
    .set(appUser, { merge: true });
};
