// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";
import { getStorage} from 'firebase/storage';
import { getFirestore, doc, getDoc} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBiZu5NMoEFyiWzG8Gs2m3LFrPkTGpmSCA",
  authDomain: "v-sign-language-ec238.firebaseapp.com",
  projectId: "v-sign-language-ec238",
  storageBucket: "v-sign-language-ec238.appspot.com",
  messagingSenderId: "105609146411",
  appId: "1:105609146411:web:6a4f2f284472d602fefa6e",
  measurementId: "G-X5WK3RB326"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage();


const getDocumentById = async (documentId, dbName) => {
  try {
    const docRef = doc(db, dbName, documentId);
    const documentSnapshot = await getDoc(docRef);

    if (documentSnapshot.exists()) {
      const data = documentSnapshot.data();
      console.log(data);
      console.log("Succesfully get document", documentId);
      return data;
    } else {
      console.log("Document not found");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
};


const getCurrentUser = () => {
  try {
    return auth.currentUser;
  } catch (error) {
    console.error("Error getting current user: ", error);
    return null;
  }
};

const getCurrentUserEmail = () => {
  try {
    const currentUser = getCurrentUser();
    return currentUser ? currentUser.email : null;
  } catch (error) {
    console.error("Error getting current user email: ", error);
    return null;
  }
};


export { storage, auth, db, getDocumentById, getCurrentUserEmail, getCurrentUser,};