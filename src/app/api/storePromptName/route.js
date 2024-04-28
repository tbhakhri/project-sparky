import { db } from "%/config"
import { doc, setDoc } from "firebase/firestore"

export async function POST(request) {
  const { promptID, userID, promptName } = await request.json()
  try {
    await setDoc(doc(db, "promptNames", promptID), {
      userID: userID,
      promptName: promptName
    })

    return new Response("Successfully inserted promptName", {
      status: 200,
      statusText: `Successfully stored promptName for user ${userID}`
    })
  } catch (e) {
    console.error(e)
  }
}
