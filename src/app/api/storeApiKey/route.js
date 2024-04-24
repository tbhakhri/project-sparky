import { db } from "%/config"
import { doc, setDoc } from "firebase/firestore"

export async function POST(request) {
  const { userID, apiKey } = await request.json()
  try {
    await setDoc(doc(db, "keys", userID), { key: apiKey })

    return new Response("Successfully inserted api key", {
      status: 200,
      statusText: `Successfully stored api key for user ${userID}`
    })
  } catch (e) {
    console.error(e)
  }
}
