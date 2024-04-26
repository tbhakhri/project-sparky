import { initializeApp } from "firebase/app"
import { getAuth, GoogleAuthProvider } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyA-yIInycNEyDf10ZulJ78fIgefLFoXzAs",
  authDomain: "sparkyv1.firebaseapp.com",
  databaseURL: "https://sparkyv1-default-rtdb.firebaseio.com",
  projectId: "sparkyv1",
  storageBucket: "sparkyv1.appspot.com",
  messagingSenderId: "765838813090",
  appId: "1:765838813090:web:ed62de3af5f5aee55274fb",
  measurementId: "G-D566HQPM9P"
}
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()
const db = getFirestore(app)
const storage = getStorage()

export { auth, provider, db, storage }
