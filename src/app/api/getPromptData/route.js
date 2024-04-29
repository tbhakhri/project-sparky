import { db } from "%/config"
import { doc, getDoc } from "firebase/firestore"

export async function GET(request) {
  const url = new URL(request.url)
  const promptID = url.searchParams.get("promptID")
  try {
    if (!promptID) {
      return new Response("Missing promptID parameter", {
        status: 400,
        statusText: "Bad Request"
      })
    }
    const promptRef = doc(db, "promptData", promptID)
    const snapshot = await getDoc(promptRef)

    if (!snapshot.exists()) {
      return new Response(`Database entry for prompt ${promptID} not found`, {
        status: 404,
        statusText: "Not Found"
      })
    }

    return new Response(
      JSON.stringify({
        promptID: promptID,
        ...snapshot.data(),
        currentVariant: 0
      }),
      {
        status: 200,
        statusText: `Successfully got promptData for prompt ${promptID}`
      }
    )
  } catch (e) {
    console.error(e)
  }
}
