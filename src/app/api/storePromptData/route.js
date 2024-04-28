import { db } from "%/config"
import { doc, setDoc } from "firebase/firestore"

export async function POST(request) {
  const { promptID, variants, hasGeneratedName } = await request.json()
  try {
    await setDoc(doc(db, "promptData", promptID), {
      variants,
      hasGeneratedName
    })

    return new Response("Successfully inserted promptData", {
      status: 200,
      statusText: `Successfully stored promptData for prompt ${promptID}`
    })
  } catch (e) {
    console.error(e)
  }
}
