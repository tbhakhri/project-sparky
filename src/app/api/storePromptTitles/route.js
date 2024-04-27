import { db } from "%/config";
import { doc, setDoc } from "firebase/firestore";

export async function POST(request) {
  const { userID, promptTitles } = await request.json();

  try {
    await setDoc(doc(db, "prompts", userID), { titles: promptTitles });

    return new Response("Successfully inserted prompt titles", {
      status: 200,
      statusText: `Successfully stored prompt titles ${promptTitles[0]} for user ${userID}`,
    });
  } catch (e) {
    console.error(e);
  }
}
