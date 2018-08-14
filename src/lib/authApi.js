import { auth, GoogleAuthProvider } from './firebaseApi';

const login = async () => {
  try {
    const result = await auth.signInWithPopup(GoogleAuthProvider);
    return result.user;
  } catch (ex) {
    return null;
  }
};

const logout = async () => {
  await auth.signOut();
};

export default {
  auth,
  login,
  logout
};
