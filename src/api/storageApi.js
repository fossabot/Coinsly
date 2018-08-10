import { storage } from './firebaseApi';

export const getImage = async imageUrl => {
  const storageRef = storage.ref(imageUrl);
  const url = await storageRef.getDownloadURL();

  return url;
};
