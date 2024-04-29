import "./ChatBubble.css"
import Image from "next/image"
import { useData } from "%/DataContext"
import { useState, useRef, useEffect } from "react"

export default function ChatBubble({ isCurrent, initialText, index, variant }) {
  const { editRequestText, deleteRequest, clearResponses, setQueueSave } =
    useData()

  const [text, setText] = useState(initialText)
  const [isEditable, setIsEditable] = useState(false)

  useEffect(() => {
    setText(initialText)
  }, [initialText])

  const handleDelete = (e) => {
    deleteRequest(variant, index)
    clearResponses()
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
    clearResponses()
    setQueueSave(true)
  }

  const inputRef = useRef(null)
  useEffect(() => {
    const textarea = inputRef.current
    textarea.style.height = "0.65rem"
    textarea.style.height = textarea.scrollHeight + "px"
  }, [text])

  return (
    <div className="bubble-container">
      {isCurrent && (
        <>
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
        </>
      )}

      <textarea
        ref={inputRef}
        value={text}
        onChange={handleEdit}
        onBlur={commitEdit}
        onKeyDown={handleKeyDown}
        disabled={!isEditable}
        className="chatBubble"
        style={{ backgroundColor: isEditable ? "#a5bcf6" : "#e8e8e8" }}
      />
    </div>
  )
}
