import { auth, GoogleAuthProvider } from './firebaseApi';

export const login = async () => {
  try {
    const result = await auth.signInWithPopup(GoogleAuthProvider);
    return result.user;
  } catch (ex) {
    return null;
  }
};

export const logout = async () => {
  await auth.signOut();
};

export default auth;
