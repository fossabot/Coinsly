import firebase from 'firebase';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyB5_LQYxg-5o1LJ8NQb1B9NdlYQ8Rewgl8',
    authDomain: 'coinsly-6ec91.firebaseapp.com',
    projectId: 'coinsly-6ec91'
  });
}

export const db = firebase.firestore();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
// export default firebase;
