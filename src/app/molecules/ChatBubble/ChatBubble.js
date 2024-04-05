import { Kumbh_Sans } from "next/font/google"
import "./ChatBubble.css"
import Image from "next/image"
import { useData } from "%/DataContext"
import { useState, useRef } from "react"

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] })

export default function ChatBubble({ initialText, index, variant }) {
  const { editRequestText, deleteRequest, acceptResponse } = useData()

  const [text, setText] = useState(initialText)
  const [isEditable, setIsEditable] = useState(false)

  const handleDelete = (e) => {
    deleteRequest(variant, index)
    acceptResponse()
  }

  const enableEdit = () => {
    setIsEditable(true)
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && isEditable) {
      commitEdit()
    }
  }

  const handleEdit = (e) => {
    setText(e.target.value)
  }

  const commitEdit = () => {
    editRequestText(variant, index, inputRef.current.value)
    setIsEditable(false)
  }

  const inputRef = useRef(null)

  return (
    <div className="bubble-container">
      <button
        className="editDeleteButton"
        onClick={isEditable ? commitEdit : enableEdit}
        style={{
          marginRight: "0.35rem"
        }}
      >
        <Image src="/edit.svg" alt="Edit text" width={10} height={10} />
      </button>
      <button
        className="editDeleteButton"
        onClick={handleDelete}
        style={{ marginRight: "0.3rem" }}
      >
        <Image
          src="/x-button-white.svg"
          alt="Delete text at index ${index}"
          width={9}
          height={9}
        />
      </button>
      <></>
      <div className={kumbh_sans.className}>
        <input
          ref={inputRef}
          value={text}
          onChange={handleEdit}
          onBlur={commitEdit}
          onKeyDown={handleKeyDown}
          disabled={!isEditable}
          className="chatBubble"
          style={{ backgroundColor: isEditable ? "#a5bcf6" : "#d9d9d9" }}
        />
      </div>
    </div>
  )
}
