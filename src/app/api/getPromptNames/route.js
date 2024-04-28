import { db } from "%/config"
import { query, where, collection, getDocs } from "firebase/firestore"

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

    const promptNamesCollection = collection(db, "promptNames")
    const q = query(promptNamesCollection, where("userID", "==", userID))

    const querySnapshot = await getDocs(q)

    const res = []

    querySnapshot.forEach((doc) => {
      const promptName = doc.data().promptName
      const docID = doc.id
      res.push({ promptID: docID, promptName })
    })

    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-Type": "application/json"
      }
    })
  } catch (e) {
    console.error(e)
  }
}
