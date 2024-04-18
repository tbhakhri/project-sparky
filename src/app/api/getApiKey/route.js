import { db } from "%/config"
import { doc, getDoc } from "firebase/firestore"

export async function GET(request) {
  try {
    const url = new URL(request.url)
    const username = url.searchParams.get("username")
    if (!username) {
      return new Response("Missing username parameter", {
        status: 400,
        statusText: "Bad Request"
      })
    }
    const userRef = doc(db, "keys", username)
    const snapshot = await getDoc(userRef)

    if (!snapshot.exists()) {
      return new Response(`Database entry for user ${username} not found`, {
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
        statusText: `Successfully got api key for user ${username}`
      }
    )
  } catch (e) {
    console.error(e)
  }
}
