import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { database } from "./firebaseSetup";

export interface goalData {
  text: string;
}

export async function writeToDB(data: goalData, collectionName: string) {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    return docRef.id;
  } catch (error) {
    console.error("Error writing to database: ", error);
  }
}

export async function deleteFromDB(id: string, collectionName: string) {
  try {
    const docRef = doc(collection(database, collectionName), id);
    await deleteDoc(docRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
  }
}

export async function deleteAllFromDB(collectionName: string) {
  try {
    const querySnapshot = await getDocs(collection(database, collectionName));
    querySnapshot.forEach(async (doc) => {
      await deleteDoc(doc.ref);
    });
    console.log("All documents successfully deleted!");
  } catch (error) {
    console.error("Error deleting documents: ", error);
  }
}
