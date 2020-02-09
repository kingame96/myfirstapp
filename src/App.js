import firebase from 'firebase'
var firebaseConfig = {
  apiKey: "AIzaSyBIHX8ZyuVx4trAU1R43OjIaPHRGr6q1g4",
  authDomain: "kingame-project.firebaseapp.com",
  databaseURL: "https://kingame-project.firebaseio.com",
  projectId: "kingame-project",
  storageBucket: "kingame-project.appspot.com",
  messagingSenderId: "223723811224",
  appId: "1:223723811224:web:87fb2a999331401f477bed"
};
firebase.initializeApp(firebaseConfig);

var database = firebase.database();
firebase.database().ref('ESP8266/number').set({
  "value": "12"
});
