import "./ChatBubble.css"
import Image from "next/image"
import { useData } from "%/DataContext"

export default function ImageBubble({ imageURL, index }) {
  const { deleteRequest } = useData()

  const handleDelete = (e) => {
    deleteRequest(index)
  }

  return (
    <div className="bubble-container">
      <div
        style={{ width: "100px", position: "relative", display: "inline-flex" }}
      >
        <Image
          src={imageURL}
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
  )
}
