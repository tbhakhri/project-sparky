import { storage } from "%/config"
import { ref, getBlob } from "firebase/storage"

/* Given the filePath to the image that's stored on the cloud, return a part */
export async function filePathToPart(filePath) {
  const fileRef = ref(storage, filePath)
  const blob = await getBlob(fileRef)
  const dataURL = await blobToDataURL(blob)
  return dataURLToPart(dataURL)
}

function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(blob)
  })
}

function dataURLToPart(dataURL) {
  const parts = dataURL.split(";")
  if (parts.length !== 2) {
    throw new Error("Invalid data URL format")
  }

  const mimeType = parts[0].split(":")[1]

  const data = parts[1].startsWith("base64,") ? parts[1].slice(7) : parts[1]

  return {
    inlineData: {
      data: data,
      mimeType: mimeType
    }
  }
}

export function createDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result)
    }
    reader.onerror = (error) => {
      reject(error)
    }
    reader.readAsDataURL(blob)
  })
}

export function generatePromptID() {
  return generateRandomID(24)
}

export function generateFileID() {
  return generateRandomID(16)
}

/* Generates a random ID based on i random ints */
function generateRandomID(i) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
  const buffer = crypto.getRandomValues(new Uint8Array(i))
  let randomID = ""
  for (let j = 0; j < i; j++) {
    randomID += characters[buffer[j] % characters.length]
  }
  return randomID
}

export async function constructChatHistory(variantHistory) {
  const n = variantHistory.length
  const res = []
  let cur = {
    role: "user",
    parts: []
  }
  for (let i = 0; i < n; i++) {
    const node = variantHistory[i]
    if (isDifferentRole(node.type, cur.role)) {
      res.push(cur)
      cur = {
        role: cur.role === "user" ? "model" : "user",
        parts: []
      }
    }
    await appendToParts(node.type, node.data, cur.parts)
  }
  if (cur.parts.length > 0) {
    res.push(cur)
  }
  return res
}

function isDifferentRole(type, curRole) {
  switch (type) {
    case "text":
    case "image":
      return curRole === "model"
    case "modelText":
      return curRole === "user"
  }
}

async function appendToParts(type, data, parts) {
  switch (type) {
    case "text":
    case "modelText":
      parts.push({ text: data })
      return
    case "image":
      console.log("IMAGE!!!")
      parts.push(await filePathToPart(data))
      return
  }
}

export function determineFileType(typeString) {
  if (typeString.startsWith("image/")) {
    return "image"
  } else if (typeString.startsWith("audio/")) {
    return "audio"
  } else {
    return "unknown"
  }
}
