// import * as firebase from 'firebase/app';
import { initializeApp } from 'firebase/app';
import { getFirestore } from '@firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyDQ1V_nu_o4KnJ6QcGf_CNvQ7DzkvZOXlI',
  authDomain: 'practice-firebase-e170e.firebaseapp.com',
  projectId: 'practice-firebase-e170e',
  storageBucket: 'practice-firebase-e170e.appspot.com',
  messagingSenderId: '33012187178',
  appId: '1:33012187178:web:1f968c565166f896b0c353',
  measurementId: 'G-L3X35R83MT',
};

// firebase 시작하기
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// export const db = firebase.initializeApp(firebaseConfig);
