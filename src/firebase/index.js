  import { initializeApp } from "firebase/app"
  import { getFirestore } from 'firebase/firestore'


  //Your web app's Firebase configuration
   const firebaseConfig = {
  	apiKey:"AIzaSyAmnopUnDywS-QYrjG-eKv7He_cDviue68",
  	authDomain:"artshop-712b2.firebaseapp.com",
  	projectId:"artshop-712b2",
  	storageBucket:"artshop-712b2.appspot.com",
  	messagingSenderId:"969253905233",
 	  appId:"1:969253905233:web:40eabe2b076fc478f92970",
   }

  //Initialize Firebase
  const app = initializeApp(firebaseConfig)

  // Get Firestore instance
  const db = getFirestore(app)

  export {
  	app as default,
  	db,
  }