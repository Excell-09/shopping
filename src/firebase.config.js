import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBls8Q3lsH-lAzNA2meqD9UeXGpytpBC8A',
  authDomain: 'shopping-f51ca.firebaseapp.com',
  projectId: 'shopping-f51ca',
  storageBucket: 'shopping-f51ca.appspot.com',
  messagingSenderId: '105114682957',
  appId: '1:105114682957:web:69b598b26ee61bc3667e04',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
