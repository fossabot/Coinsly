import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyDSSZ679-oFaXqMeIdqSWHC7rGWpY1qHcU',
    authDomain: 'coinsly-week-5.firebaseapp.com',
    projectId: 'coinsly-week-5'
  });
}

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const api = firestore;
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
