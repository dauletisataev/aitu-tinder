import firebase from "firebase/app";
import "firebase/storage";

var firebaseConfig = {
  apiKey: "AIzaSyD_rxhUSEK2go22ryae7hxWTmz0CauKRrI",
  authDomain: "wastezero-9c4c0.firebaseapp.com",
  projectId: "wastezero-9c4c0",
  storageBucket: "wastezero-9c4c0.appspot.com",
  messagingSenderId: "662506198613",
  appId: "1:662506198613:web:8b5eedd4dec287638fe6dc",
};

export const firebaseapp = firebase.initializeApp(firebaseConfig);
