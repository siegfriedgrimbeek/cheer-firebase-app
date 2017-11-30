import firebase from 'firebase'
// Initialize Firebase
const config = {
  apiKey: "AIzaSyAj1u7bl2-hyQbhI9mxKiKSqJ9KFskXNqA",
  authDomain: "clapclap-8d15f.firebaseapp.com",
  databaseURL: "https://clapclap-8d15f.firebaseio.com",
  projectId: "clapclap-8d15f",
  storageBucket: "clapclap-8d15f.appspot.com",
  messagingSenderId: "958575934696"
};

firebase.initializeApp(config);
const firebaseDbh = firebase.database();
export default firebaseDbh;
