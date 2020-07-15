import * as firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyDBAJo96XqEw-CiBlSyN_pRwsRdCibzHxo",
    authDomain: "reactnativeapp-7467c.firebaseapp.com",
    databaseURL: "https://reactnativeapp-7467c.firebaseio.com",
    projectId: "reactnativeapp-7467c",
    storageBucket: "reactnativeapp-7467c.appspot.com",
    messagingSenderId: "1040354619939",
    appId: "1:1040354619939:web:58486dd843e731150bf796",
    measurementId: "G-JQ25PNRTSD"
  };

  const fire = firebase.initializeApp(firebaseConfig);
  export default fire;