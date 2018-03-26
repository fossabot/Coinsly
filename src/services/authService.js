import { auth, GoogleAuthProvider } from './firebaseService';

export const logIn = async () => {
  try {
    const result = await auth.signInWithPopup(GoogleAuthProvider);
    return result.user;
  } catch (ex) {
    console.error('errorss: ', ex);
    return null;
  }
};

export const logOut = async () => {
  await auth.signOut();
};

export default auth;
