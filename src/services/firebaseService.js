import firebase from 'firebase';
import 'firebase/firestore';

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: 'AIzaSyBDmyLf6HuwhFgUucjHXgKjn1fWFpABrxk',
    authDomain: 'coins-b08dd.firebaseapp.com',
    projectId: 'coins-b08dd'
  });
}

export const db = firebase.firestore();
export const GoogleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
// export default firebase;
