import { initializeApp } from "firebase/app"

import { getFirestore, doc, getDoc, setDoc, getDocs, collection, writeBatch, query } from "firebase/firestore"

import { getAuth, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAMK8fsJ4ogTOZb24WsGFxyDe5F0iP44JE",
    authDomain: "integrador-3-react.firebaseapp.com",
    projectId: "integrador-3-react",
    storageBucket: "integrador-3-react.appspot.com",
    messagingSenderId: "544496296943",
    appId: "1:544496296943:web:9922a94a1cca8b60320c1a"
};


const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider()

provider.setCustomParameters({
    prompt: "select_account"
})

export const db = getFirestore()

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return

    const userDocRef = doc(db, "user", userAuth.uid);

    const userSnapshot = await getDoc(userDocRef)
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message);
        }
    }

    return userDocRef;
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return

    return createUserWithEmailAndPassword(auth, email, password)
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth)

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = collection(db, collectionKey)
    const batch = writeBatch(db)
    objectsToAdd.forEach((object) => {
        const docRef = doc(collectionRef, object.title.toLowerCase())
        batch.set(docRef, object)
    })
    await batch.commit()
    console.log("done")
}

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db, 'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
        const { title, items } = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    }, {});

    return categoryMap;
}

