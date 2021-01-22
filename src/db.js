import firebase from 'firebase'

// firebase設定值
const firebaseConfig = {
  apiKey: 'AIzaSyAX7SvJDkzdvxkOQF9QHHhDV32WF1Dd2Ho',
  authDomain: 'bobo-backend.firebaseapp.com',
  databaseURL: 'https://bobo-backend-default-rtdb.firebaseio.com',
  projectId: 'bobo-backend',
  storageBucket: 'bobo-backend.appspot.com',
  messagingSenderId: '751646942608',
  appId: '1:751646942608:web:7becfb9ba8f27edeea3f15',
  measurementId: 'G-5S4E756ET4',
}
firebase.initializeApp(firebaseConfig)

/*
 ########### firestore(上傳資料) ###########
 */
const db = firebase.firestore()
const repairsCollection = db.collection('article')

/*
 ########### firestore(上傳檔案) ###########
 */
const storageRef = firebase.storage().ref()

/* 
 ########### 登入 ###########
*/
const User = firebase.auth()

export { db, repairsCollection, storageRef, User }
