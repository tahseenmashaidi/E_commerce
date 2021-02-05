import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

const config={
    apiKey: "AIzaSyAj81hYvrjzAr46pZSJS8wrqXnoQbOJNyg",
    authDomain: "crwn-db-1cd0b.firebaseapp.com",
    projectId: "crwn-db-1cd0b",
    storageBucket: "crwn-db-1cd0b.appspot.com",
    messagingSenderId: "458063876474",
    appId: "1:458063876474:web:9436e2df7303d2e137c6c3",
    measurementId: "G-2H3QWW39N6"
}

export const createUserProfileDocument= async (userAuth,additionalData)=>{
    console.log("ds")
    if (!userAuth) return;
    const userRef=firestore.doc(`users/${userAuth.uid}` )
    const snapShot=await userRef.get();
    if (!snapShot.exists){
        const {displayName,email}=userAuth;
        const createdAt=new Date();
        try {
            await  userRef.set({
                displayName,email,createdAt,...additionalData
            })
        }catch (error) {
            console.log("error creating user", error.message);
        }
        return userRef;
    }
    return userRef;
}
firebase.initializeApp(config);
export const auth=firebase.auth();
export const firestore=firebase.firestore();

const provider=new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'})
export const  signInWithGoogle=()=>auth.signInWithPopup(provider);
export default firebase;