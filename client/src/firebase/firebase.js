import * as firebase from 'firebase';

const config = {
    apiKey: "AIzaSyDI4MsKxNIQ2gmnreJD6JtYKBZzzwusN4Y",
    authDomain: "react-firebase-ecaf8.firebaseapp.com",
    databaseURL: "https://react-firebase-ecaf8.firebaseio.com",
    projectId: "react-firebase-ecaf8",
    storageBucket: "",
    messagingSenderId: "140526406069"
  };

if (!firebase.apps.length) {
    firebase.initializeApp(config);
}

const auth = firebase.auth();

export {
    auth,
};