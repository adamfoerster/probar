import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBn9vJ2bKANpLy6qxStrV8VIPKdmPr6sgc",
  authDomain: "adam-foerster.firebaseapp.com",
  databaseURL: "https://adam-foerster.firebaseio.com",
  projectId: "adam-foerster",
  storageBucket: "adam-foerster.appspot.com",
  messagingSenderId: "787711639817",
  appId: "1:787711639817:web:576bbfce689912422793d8"
};

let _db = null;;
export const db = () => {
  if (!_db) {
    _db = firebase.firestore();
  }
  return _db;
} 

firebase.initializeApp(firebaseConfig);
export default firebase;
