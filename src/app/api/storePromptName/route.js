import { db } from "%/config"
import { doc, setDoc } from "firebase/firestore"

export async function POST(request) {
  const { promptID, userID, promptTitle } = await request.json()
  try {
    await setDoc(doc(db, "promptTitles", promptID), {
      userID: userID,
      promptTitle: promptTitle
    })

    return new Response("Successfully inserted promptTitle", {
      status: 200,
      statusText: `Successfully stored promptTitle for user ${userID}`
    })
  } catch (e) {
    console.error(e)
  }
}
