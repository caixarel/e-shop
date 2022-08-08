// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,
  signInWithRedirect,
  signInWithPopup,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
signInWithEmailAndPassword,
signOut,
onAuthStateChanged } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getFirestore, doc, getDoc, setDoc,collection,
writeBatch,query,getDocs} from 'firebase/firestore'

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
initializeApp(firebaseConfig);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
  prompt:"select_account"
})

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth, provider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider)
export const db = getFirestore()

export const addCollectionAndDocuments = async (collectionKey,objectsToAdd) =>{
  const collectionref = collection(db,collectionKey);
  const batch = writeBatch(db);
  objectsToAdd.forEach((object)=>{
    const docRef = doc(collectionref,object.title.toLowerCase());
    batch.set(docRef, object)
  })
  await batch.commit();
}

export const getCategoriesAndColletions = async ()=>{
  const collectionref = collection(db,'categories');
  const q = query(collectionref);
  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((accumulator,docSnaphot)=>{
    const { title, items } = docSnaphot.data();
    accumulator[title.toLowerCase()] = items;
    return accumulator
  },{})
  return categoryMap;
}

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
