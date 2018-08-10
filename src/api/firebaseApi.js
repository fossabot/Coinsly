import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyCS1WF6oQbSRVowR4ubkFGm-95LuikXG_Y',
    authDomain: 'coinsly-c4330.firebaseapp.com',
    projectId: 'coinsly-c4330',
    storageBucket: 'coinsly-c4330.appspot.com'
  });
}

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

export const api = firestore;
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
export const storage = firebase.storage();
