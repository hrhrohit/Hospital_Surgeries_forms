// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, query, where, getDocs, updateDoc, doc, getDoc } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADcrB_rp0goAK5Ciw-CsywToyCIn_xh04",
  authDomain: "form-6b5e4.firebaseapp.com",
  projectId: "form-6b5e4",
  storageBucket: "form-6b5e4.appspot.com",
  messagingSenderId: "903749042969",
  appId: "1:903749042969:web:6e714b8b1c7b4f3770fb88"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export const addUser = async (userData, Collectionname) => {
  try {
    const docRef = await addDoc(collection(db, Collectionname), userData);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Optionally return the documenat ID
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error; // Rethrow to handle it in the calling component
  }
};

export const fetchDocumentsByDate = async (surgeryDate) => {
  const q = query(collection(db, "DoctorDetails"), 
  where("surgeryDate", "==", surgeryDate)
);
  const querySnapshot = await getDocs(q);
  const documents = [];
  querySnapshot.forEach((doc) => {
    documents.push({ id: doc.id, ...doc.data() });
  });
  return documents;
};

export const updateDocument = async (docId, updateData, collectionName) => {
  const documentRef = doc(db, collectionName, docId);
  try {
    await updateDoc(documentRef, updateData);
    console.log("Document updated with ID: ", docId);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error; // Rethrow to handle it in the calling component
  }
};


export const fetchNames = async (collectionName) => {
  const surgeonNames = [];
  const querySnapshot = await getDocs(collection(db, collectionName));
  querySnapshot.forEach((doc) => {
    surgeonNames.push(doc.data().name); // Assuming 'name' is the field you want
  });
  return surgeonNames;
};


// Function to fetch pass keys based on the role
export const fetchPassKeys = async () => {
  const passKeyDocRef = doc(db, "passKey", "passKey"); // Assume 'config' is the collection and 'passKeys' is the document ID
  try {
    const docSnap = await getDoc(passKeyDocRef);
    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.log("No pass key data available");
      return null;
    }
  } catch (error) {
    console.error("Failed to fetch pass keys:", error);
    throw new Error("Failed to fetch pass keys");
  }
};
