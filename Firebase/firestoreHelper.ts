import { collection, addDoc } from "firebase/firestore";
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
