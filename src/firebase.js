import * as firebase from 'firebase'

// Initalize and export Firebase.
const config = {
  apiKey: "AIzaSyBkI6-zWYxogGMvBOLxoKsnMVNg6rduFkQ",
  authDomain: "ballot-helper.firebaseapp.com",
  databaseURL: "https://ballot-helper.firebaseio.com",
  projectId: "ballot-helper",
  storageBucket: "ballot-helper.appspot.com",
  messagingSenderId: "133099102173"
}
export default firebase.initializeApp(config)
