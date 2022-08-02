// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged  } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, doc, getDoc, setDoc} from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCFmpuajxek6hm_ShOiCJsNy_A-OYGqLoA",
  authDomain: "crwn-project-33134.firebaseapp.com",
  projectId: "crwn-project-33134",
  storageBucket: "crwn-project-33134.appspot.com",
  messagingSenderId: "644830174347",
  appId: "1:644830174347:web:52af4c6569495074cb888e"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)
export const db = getFirestore()

export const createDocumentUSerFromAuth = async(userAuth,aditionalInformation = {})=>{
  const userDocRef = doc(db,'users',userAuth.uid)
  const userSnapShot = await getDoc(userDocRef)
  if(!userSnapShot.exists()){
    const { displayName, email} = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef,{
        displayName,
         email,
         createdAt,
          ...aditionalInformation});
    }
    catch(error){
      console.log(error)
    }
  }
  return userDocRef
}
export const createAuthWithEmailAndPassword = async (email,password)=>{
  if(!email || !password) return
  return await createUserWithEmailAndPassword(auth,email,password)
}
export const SignInAuthWithEmailAndPassword = async (email,password)=>{
  if(!email || !password) return
  return await signInWithEmailAndPassword(auth,email,password)
}
export const  SignOutUser = async ()=>{
 await signOut(auth)
}

export const onAuthStateChangedListener = (callback) => {
  onAuthStateChanged(auth,callback)
}
