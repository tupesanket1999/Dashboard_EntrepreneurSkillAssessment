import firebase from 'firebase';

const config={
    apiKey: "AIzaSyBjoukH30bwcYrKGC_juTIbeia_HArc5DM",
    authDomain: "test-fe4c2.firebaseapp.com",
    databaseURL: "https://test-fe4c2.firebaseio.com",
    projectId: "test-fe4c2",
    storageBucket: "test-fe4c2.appspot.com",
    messagingSenderId: "558291834657",
    appId: "1:558291834657:web:8e60929ea614e7bf121060",
    measurementId: "G-HZQJ79GYSR"
};
    
const fire = firebase.initializeApp(config);
export default fire;