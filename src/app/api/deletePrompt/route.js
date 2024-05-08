import { db, storage } from "%/config"
import { doc, deleteDoc } from "firebase/firestore"
import { ref, listAll, deleteObject } from "firebase/storage"

export async function POST(request) {
  const { promptID, userID } = await request.json()
  try {
    const promptDataRef = doc(db, "promptData", promptID)
    const promptTitleRef = doc(db, "promptTitles", promptID)

    const folderPath = `${userID}/${promptID}`
    const folderRef = ref(storage, folderPath)

    const listResult = await listAll(folderRef)
    if (listResult.items.length > 0) {
      await Promise.all(
        listResult.items.map((itemRef) => deleteObject(itemRef))
      )
    }
    await deleteDoc(promptDataRef)
    await deleteDoc(promptTitleRef)
    return new Response("Successfully deleted prompt", {
      status: 200,
      statusText: `Successfully deleted prompt ${promptID}`
    })
  } catch (e) {
    console.error(e)
    return new Response("Error deleting prompt: " + e.message, { status: 500 })
  }
}
