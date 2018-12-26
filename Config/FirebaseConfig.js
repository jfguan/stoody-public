import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: "AIzaSyDnnSaCl_BCymYXC6T7GFx5hgGRioa2djg",
	authDomain: "stoody-7c7e1.firebaseapp.com",
	databaseURL: "https://stoody-7c7e1.firebaseio.com",
	projectId: "stoody-7c7e1",
	storageBucket: "stoody-7c7e1.appspot.com",
	messagingSenderId: "388094586243"
};



//their stuff
const firebaseApp = firebase.initializeApp(firebaseConfig);

//our stuff
//const firebaseApp = firebase.initializeApp(firebaseConfig);
//const settings = { timestampsInSnapshots: true};
//const db = firebaseApp.firestore()
//db.settings(settings)

export default firebaseApp;