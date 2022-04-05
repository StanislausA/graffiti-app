const firebase = require('firebase/app');
const firestore = require('firebase/firestore/lite');
require('dotenv').config();

const firebaseConfig = {
  apiKey: process.env.FIRESTOREAPIKEY,
  authDomain: process.env.FIRESTOREAUTHDOMAIN,
  projectId: process.env.FIRESTOREPROJECTID,
  storageBucket: process.env.FIRESTOREBUCKET,
  messagingSenderId: process.env.FIRESTORESENDERID,
  appId: process.env.FIRESTOREAPPID
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Connect to database
const database = firestore.getFirestore(app);

module.exports = database;
