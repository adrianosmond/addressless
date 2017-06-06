import * as firebase from "firebase";

var config = {
	apiKey: "AIzaSyDKH3sCLI9zyCgsH32daJt8rH8QKTo9ahY",
	authDomain: "travel-blog-bd926.firebaseapp.com",
	databaseURL: "https://travel-blog-bd926.firebaseio.com",
	projectId: "travel-blog-bd926",
	storageBucket: "travel-blog-bd926.appspot.com",
	messagingSenderId: "754787375133"
};

firebase.initializeApp(config);

const database = firebase.database()
const storage = firebase.storage()

export { database, storage };
