export function dataURLToPart(dataURL) {
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
  return generateRandomID(2)
}

export function generateImageID() {
  return generateRandomID(3)
}

/* Generates a random ID based on i random ints */
function generateRandomID(i) {
  const buffer = crypto.getRandomValues(new Uint8Array(i))
  return buffer.toString("base64").replace(/,/g, "")
}
