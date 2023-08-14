import { getFirestore } from "firebase/firestore";
import firebase_app from "@/components/firebase/Config";

const db = getFirestore(firebase_app);

export { db };
