import { storage } from './firebaseApi';

const getImage = async imageUrl => {
  const storageRef = storage.ref(imageUrl);
  const url = await storageRef.getDownloadURL();

  return url;
};

export default {
  getImage
};
