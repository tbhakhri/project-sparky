import "./ChatBubble.css"
import Image from "next/image"
import { useData } from "%/DataContext"
import { useState } from "react"

export default function AudioBubble({ isCurrent, index, variant, savePrompt }) {
  const { deleteRequest, clearResponses } = useData()

  const handleDelete = (e) => {
    deleteRequest(variant, index)
    clearResponses()
    setQueueSave(true)
  }
  const [queueSave, setQueueSave] = useState(false)
  useEffect(() => {
    if (queueSave) {
      savePrompt()
      setQueueSave(false)
    }
  }, [queueSave])

  return (
    <div className="bubble-container">
      <div
        style={{
          width: "100px",
          position: "relative",
          display: "inline-flex"
        }}
      >
        <Image
          src="/audio-waves.svg"
          alt="added audio file"
          width={20}
          height={0}
          layout="responsive"
        />
        {isCurrent && (
          <button onClick={handleDelete} className="deleteImageButton">
            <Image
              src="/x-button-white.svg"
              alt={`Delete audio file at index ${index}`}
              width={10}
              height={10}
            />
          </button>
        )}
      </div>
    </div>
  )
}
