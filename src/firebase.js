import * as firebase from "firebase";
import firestore from "firebase/firestore";

const settings = { timestampsInSnapshots: true };

const config = {
  apiKey: "AIzaSyC0RVQWK0unaZ0NzR98JbMgInfDfnvY8NI",
  authDomain: "meucredere.firebaseapp.com",
  databaseURL: "https://meucredere.firebaseio.com",
  projectId: "meucredere",
  storageBucket: "meucredere.appspot.com",
  messagingSenderId: "1069149525375"
};

firebase.initializeApp(config);

firebase.firestore().settings(settings);

export default firebase;
