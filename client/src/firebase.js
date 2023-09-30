// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from  "firebase/auth";
import { getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import { getFirestore, doc, getDoc, collection, addDoc, getDocs, query, where, orderBy, startAt, endAt } from "firebase/firestore";

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

// Function to get video URL from Firebase Storage
const getVideoFromFirebase = async (folder_name, file_name) => {
  try {
    // Create a reference to Firebase Storage with the folder and file names
    const videoRef = ref(storage, `${folder_name}/${file_name}`);

    // Get the download URL of the video
    const url = await getDownloadURL(videoRef);
    return url;
  } catch (error) {
    console.error('Error getting video download URL:', error);
    throw error; // Rethrow the error to handle it outside this function
  }
}

// Function to get image URL from Firebase Storage
const getImageFromFirebase = async (folder_name, file_name) => {
  try {
    // Create a reference to Firebase Storage with the folder and file names
    const imageRef = ref(storage, `${folder_name}/${file_name}`);
    // Get the download URL of the image
    const url = await getDownloadURL(imageRef);
    console.log(url)
    return url;
  } catch (error) {
    console.error('Error getting image URL:', error);
    throw error; // Rethrow the error to handle it outside this function
  }
}

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

//them data vao firebase
const addDataToFirestore = async (m_name, m_data, m_tag, m_isPublic, dbName) => {
  const minValue = 10;
  const maxValue = 200;
  const randomLike = Math.floor(Math.random() * (maxValue - minValue) + minValue);
  const randomDislike = Math.floor(Math.random() * (maxValue - minValue) + minValue);
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
      data: m_data,
      uid: m_uid,
      timestamp: currentTimeStamp,
      isPublic: m_isPublic,
      tag: m_tag,
      like: randomLike,
      dislike: randomDislike
    });
    console.log("Document written with ID: ", docRef.id);
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

// filter query

const getDataFromFirestoreByFilters = async (name, isPublic, tag, uid, startTime, endTime, dbName) => {
  try {
    const collectionRef = collection(db, dbName);

    if(name === "")
    {
      name = undefined;
    }

    let queryRef = collectionRef;
    if (name !== undefined) { 
      queryRef = query(queryRef, where("name", "==", name));
    }

    if (isPublic !== undefined) {
      queryRef = query(queryRef, where("isPublic", "==", isPublic));
    }

    if (tag !== undefined && tag !== "All") {
      queryRef = query(queryRef, where("tag", "==", tag));
    }

    if (startTime !== undefined && endTime !== undefined) {
      queryRef = query(queryRef, where("timestamp", ">=", startTime), where("timestamp", "<=", endTime));
    }
    else if( startTime !== undefined) {
      queryRef = query(queryRef, where("timestamp", ">=", startTime));
    }
    else if( endTime !== undefined) {
      queryRef = query(queryRef, where("timestamp", "<=", endTime));
    }

    if (uid !== undefined)
    {
      queryRef = query(queryRef, where("uid", "==", uid))
    }

    const querySnapshot = await getDocs(queryRef);

    const dataWithFilters = [];
    querySnapshot.forEach((doc) => {
      const data = doc.data();
      dataWithFilters.push({
        id: doc.id,
        name: data.name,
        data: data.data,
        uid: data.uid,
        timestamp: data.timestamp,
        isPublic: data.isPublic,
        like: data.like,
        dislike: data.dislike,
        tag: data.tag
      });
    });
    // console.log(dataWithFilters);
    return dataWithFilters;
  } catch (error) {
    console.error("Error getting data by filters: ", error);
    return [];
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

// get specific item with id
const getDataFromFirestoreById = async (id, dbName) => {
  try {
    const docRef = doc(db, dbName, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        id: docSnap.id,
        name: data.name,
        data: data.data,
        uid: data.uid,
        timestamp: data.timestamp,
        isPublic: data.isPublic,
        like: data.like,
        dislike: data.dislike,
        tag: data.tag
      };
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    return null;
  }
};






export { auth, db, getDocumentById, addDataToFirestore, getCurrentUserEmail, getCurrentUser, getDataFromFirestoreByFilters, getDataFromFirestoreById, getVideoFromFirebase, getImageFromFirebase};