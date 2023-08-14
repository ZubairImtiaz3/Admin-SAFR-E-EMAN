import { db } from "@/components/firebase/store/FireStore";

// CREATE: Add a document
export const addDocument = async (collectionPath, data) => {
  const docRef = await db.collection(collectionPath).add(data);
  return docRef.id;
};

// READ: Fetch documents from a collection
export const fetchDocuments = async (collectionPath) => {
  const snapshot = await db.collection(collectionPath).get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// UPDATE: Update a document by its ID
export const updateDocument = async (collectionPath, docId, data) => {
  await db.collection(collectionPath).doc(docId).update(data);
};

// DELETE: Delete a document by its ID
export const deleteDocument = async (collectionPath, docId) => {
  await db.collection(collectionPath).doc(docId).delete();
};
