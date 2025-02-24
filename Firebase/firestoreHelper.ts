import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { database } from "./firebaseSetup";
import { User, GoalData } from "@/types";



export async function writeToDB(data: GoalData|User, collectionName: string) {
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

// read all documents from the database
export async function readAllFromDB(collectionName: string) {
  const querySnapshot = await getDocs(collection(database,collectionName));
  if (querySnapshot.empty) {
    console.log("No documents found");
    return null;
  }
  return querySnapshot.docs.map((doc) => doc.data());
}

// read a single document from the database
export async function getGoalFromDB(id: string, collectionName: string) {
  try {
    const docRef = doc(collection(database, collectionName), id);
    const docSnapShot = await getDoc(docRef);
    if (docSnapShot.exists()) {
      return docSnapShot.data();
    } else {
      console.log("No such document!");
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
}

export const updateDB = async (id: string, data: { warning: boolean }) => {
  const docRef = doc(database, "goals", id);
  await updateDoc(docRef, data);
};