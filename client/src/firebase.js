// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";
import { getStorage} from 'firebase/storage';
import { getFirestore, doc, getDoc, addDoc, collection} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDtZ3_Ox3V7iH9Brd8W5utdgeREEI5IK_k",
  authDomain: "vsl2-c073a.firebaseapp.com",
  projectId: "vsl2-c073a",
  storageBucket: "vsl2-c073a.appspot.com",
  messagingSenderId: "492727775057",
  appId: "1:492727775057:web:b43219e7e715177e712d70",
  measurementId: "G-FGHQSBEF1C"
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