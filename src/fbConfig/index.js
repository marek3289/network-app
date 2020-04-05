import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyDHV3CPGpfcnxqCPakbLsFpGqJgyha9pgs',
  authDomain: 'network-app-86145.firebaseapp.com',
  databaseURL: 'https://network-app-86145.firebaseio.com',
  projectId: 'network-app-86145',
  storageBucket: 'network-app-86145.appspot.com',
  messagingSenderId: '937092116458',
  appId: '1:937092116458:web:3f4f58de492b1e29644c93',
  measurementId: 'G-M15Y7KFRFC',
};

firebase.initializeApp(firebaseConfig);

export default firebase;
