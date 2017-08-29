import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBGunOuqN3SnUgyZvnR1hrjgZuYkq9sDZQ",
    authDomain: "dadsite-e5655.firebaseapp.com",
    databaseURL: "https://dadsite-e5655.firebaseio.com",
    projectId: "dadsite-e5655",
    storageBucket: "dadsite-e5655.appspot.com",
    messagingSenderId: "757406980969"
};
firebase.initializeApp(config);

export const ref = firebase.database().ref();
export const firebaseAuth = firebase.auth;