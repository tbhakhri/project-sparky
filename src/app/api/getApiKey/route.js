import { db } from "%/config"
import { doc, getDoc } from "firebase/firestore"

export async function GET(request) {
  const url = new URL(request.url)
  const userID = url.searchParams.get("userID")
  try {
    if (!userID) {
      return new Response("Missing userID parameter", {
        status: 400,
        statusText: "Bad Request"
      })
    }
    const userRef = doc(db, "keys", userID)
    const snapshot = await getDoc(userRef)

    if (!snapshot.exists()) {
      return new Response(`Database entry for user ${userID} not found`, {
        status: 404,
        statusText: "Not Found"
      })
    }

    const result = snapshot.data().key
    return new Response(
      JSON.stringify({
        apiKey: result
      }),
      {
        status: 200,
        statusText: `Successfully got api key for user ${userID}`
      }
    )
  } catch (e) {
    console.error(e)
  }
}
