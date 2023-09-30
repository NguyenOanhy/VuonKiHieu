// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";
import { getStorage} from 'firebase/storage';
import { getFirestore, doc, getDoc, addDoc, collection} from "firebase/firestore";

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

//them data vao firebase
const addDataToFirestore = async (m_name, m_content, m_image, dbName) => {
  const minValue = 10;
  const maxValue = 200;
  // const randomLike = Math.floor(Math.random() * (maxValue - minValue) + minValue);
  // const randomDislike = Math.floor(Math.random() * (maxValue - minValue) + minValue);
  try {
    const collectionRef = collection(db, dbName);
    const currentTimeStamp = new Date().getTime();
    let m_uid = null;
    if (auth.currentUser === null) {
      m_uid = null;
    } else {
      m_uid = auth.currentUser.uid;
    }
    const docRef = await addDoc(collectionRef, {
      name: m_name,
      data: m_content,
      uid: m_uid,
      timestamp: currentTimeStamp,
      image: m_image
      // tag: m_tag,
      // like: randomLike,
      // dislike: randomDislike
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

export { storage, auth, db, getDocumentById, getCurrentUserEmail, getCurrentUser, addDataToFirestore};