import "./PromptTitles.css"
import { useData } from "%/DataContext"
import AuthContext from "%/authContext"

import { useState, useRef, useEffect, useContext } from "react"

export default function PromptTitles({
  promptID,
  initialTitle,
  isEditing,
  setEditing,
  selectPrompt,
  toggleSidebar
  }) {
  const { user } = useContext(AuthContext)
  const { setPromptTitles, promptTitles } = useData()

  
  async function updateName(newPromptTitle) {
    try {
      const response = await fetch("/api/storePromptTitle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          promptID,
          userID: user.uid,
          promptTitle: newPromptTitle
        })
      })

      if (!response.ok) {
        console.error(`Failed to update prompt name for prompt ${promptID}.`)
      } else {
        const updatedPromptTitles = promptTitles.map((item) => {
          if (item.promptID === promptID) {
            return { ...item, promptTitle: newPromptTitle }
          }
          return item
        })
        setPromptTitles(updatedPromptTitles)
      }
    } catch (error) {
      console.error("Error updated prompt title:", error)
    }
  }

  const [title, setTitle] = useState(initialTitle)

  useEffect(() => {
    setTitle(initialTitle)
  }, [initialTitle])

  const handleKeyDown = (event) => {
    if (event.keyCode === 13 && isEditing) {
      commitEdit()
    }
  }

  async function commitEdit() {
    await updateName(title)
    setEditing(-1)
  }

  const handleEdit = (e) => {
    setTitle(e.target.value)
  }

  const handleTitleClick = () => {
    if (!isEditing) {
      selectPrompt(promptID, title)
      toggleSidebar()
    }
  }

  const inputRef = useRef(null)

  useEffect(() => {
    if (inputRef.current && isEditing) {
      inputRef.current.focus()
    }
  }, [isEditing])

  return isEditing ? (
    <input
      ref={inputRef}
      value={title}
      id={promptID}
      onChange={handleEdit}
      onKeyDown={handleKeyDown}
      onBlur={commitEdit}
      className="promptItem"
      style={{ color: "#a5bcf6" }}
      autoFocus
    />
  ) : (
    <div onClick={handleTitleClick} className="promptItem" id={promptID}>
      {title}
    </div>
  )
}
