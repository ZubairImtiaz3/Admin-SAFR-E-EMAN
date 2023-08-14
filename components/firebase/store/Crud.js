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

// READ: Fetch documents from a collection and show its sub collection as well
export const fetchDocuments = async (collectionPath, subCollectionName) => {
  const docCollection = collection(db, collectionPath);
  const snapshot = await getDocs(docCollection);

  const withSubcollectionsPromises = snapshot.docs.map(async (mainDoc) => {
    const mainData = mainDoc.data();

    const subCollectionRef = collection(
      doc(db, collectionPath, mainDoc.id),
      subCollectionName
    );
    const subSnapshot = await getDocs(subCollectionRef);
    const subData = subSnapshot.docs.map((subDoc) => subDoc.data());

    return {
      id: mainDoc.id,
      ...mainData,
      [subCollectionName]: subData, // Using the subCollectionName as the key
    };
  });

  const allDataWithSubcollections = await Promise.all(
    withSubcollectionsPromises
  );
  return allDataWithSubcollections;
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
