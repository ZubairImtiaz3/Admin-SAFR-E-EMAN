import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "@/components/firebase/store/FireStore";

// CREATE: Add a new document to a collection
export const addDocument = async (collectionPath, data) => {
  const docCollection = collection(db, collectionPath);
  const docRef = await addDoc(docCollection, data);
  return docRef.id;
};

// READ: Fetch documents from a collection
export const fetchDocuments = async (collectionPath) => {
  const docCollection = collection(db, collectionPath);
  const snapshot = await getDocs(docCollection);

  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// UPDATE: Update a document by its ID
export const updateDocument = async (collectionPath, docId, data) => {
  const documentRef = doc(db, collectionPath, docId);
  await updateDoc(documentRef, data);
};

// REPLACE: Set/replace data for a specific document (creates it if it doesn't exist)
export const setDocument = async (collectionPath, docId, data) => {
  const documentRef = doc(db, collectionPath, docId);
  await setDoc(documentRef, data);
};

// DELETE: Delete a document by its ID
export const deleteDocument = async (collectionPath, docId) => {
  const documentRef = doc(db, collectionPath, docId);
  await deleteDoc(documentRef);
};
