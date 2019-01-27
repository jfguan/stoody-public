import * as firebase from 'firebase';

const firebaseConfig = {
	apiKey: "",
	authDomain: "",
	databaseURL: "",
	projectId: "",
	storageBucket: "",
	messagingSenderId: ""
};



//their stuff
const firebaseApp = firebase.initializeApp(firebaseConfig);

//our stuff
//const firebaseApp = firebase.initializeApp(firebaseConfig);
//const settings = { timestampsInSnapshots: true};
//const db = firebaseApp.firestore()
//db.settings(settings)

export default firebaseApp;
