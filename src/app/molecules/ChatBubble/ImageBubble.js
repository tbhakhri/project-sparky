import "./ChatBubble.css"
import Image from "next/image"
import { useData } from "%/DataContext"
import { storage } from "%/config"
import { useState, useEffect } from "react"
import { ref, getDownloadURL } from "firebase/storage"

export default function ImageBubble({ imageURL, index, variant }) {
  const { deleteRequest, clearResponses } = useData()

  const handleDelete = (e) => {
    deleteRequest(variant, index)
    clearResponses()
  }

  const [imageDataUrl, setImageDataUrl] = useState("")

  useEffect(() => {
    const loadImageFromStorage = async () => {
      try {
        getDownloadURL(ref(storage, imageURL)).then((url) => {
          console.log(url)
          setImageDataUrl(url)
        })
      } catch (error) {
        console.error("Error loading image from Firebase Storage:", error)
      }
    }
    if (imageURL) {
      loadImageFromStorage()
    }

    return () => {}
  }, [imageURL])

  return (
    <>
      {imageDataUrl !== "" && (
        <div className="bubble-container">
          <div
            style={{
              width: "100px",
              position: "relative",
              display: "inline-flex"
            }}
          >
            <Image
              src={imageDataUrl}
              alt="added image"
              width={50}
              height={0}
              layout="responsive"
            />
            <button onClick={handleDelete} className="deleteImageButton">
              <Image
                src="/x-button-white.svg"
                alt={`Delete image at index ${index}`}
                width={10}
                height={10}
              />
            </button>
          </div>
        </div>
      )}
    </>
  )
}
