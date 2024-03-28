import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, serverTimestamp, query, onSnapshot } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


// Initialize Firebase
initializeApp(firebaseConfig);

const firestore = getFirestore();
const MESSAGES ='messages';

export{
    firestore,
    collection,
    addDoc,
    serverTimestamp,
    query,
    onSnapshot,
    MESSAGES
};