import * as firebase from "firebase";

// Initialize Firebase
const config = {
  apiKey: "AIzaSyC0RVQWK0unaZ0NzR98JbMgInfDfnvY8NI",
  authDomain: "meucredere.firebaseapp.com",
  databaseURL: "https://meucredere.firebaseio.com",
  projectId: "meucredere",
  storageBucket: "",
  messagingSenderId: "1069149525375"
};

export const firebaseApp = firebase.initializeApp(config);
export const userRef = firebase.database().ref("users");
