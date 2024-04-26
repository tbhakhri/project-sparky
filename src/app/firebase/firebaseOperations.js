import { db } from "%/config";
import { collection, query, where, getDocs, orderBy } from "firebase/firestore";

export async function fetchUserResponses(userID) {
  const responsesCol = collection(db, "users", userID, "responses");
  const q = query(responsesCol, orderBy("timestamp", "desc"));

  try {
    const querySnapshot = await getDocs(q);
    const responses = [];
    querySnapshot.forEach((doc) => {
      responses.push(doc.data());
    });
    return responses;
  } catch (error) {
    console.error("Error fetching user responses:", error);
    return [];
  }
}
