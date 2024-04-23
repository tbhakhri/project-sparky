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
