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
  const { setPromptNames, promptNames } = useData()

  /* stores the updated name in the promptNames db. updates promptNames state */
  async function updateName(newPromptName) {
    try {
      const response = await fetch("/api/storePromptName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          promptID,
          userID: user.uid,
          promptName: newPromptName
        })
      })

      if (!response.ok) {
        console.error(`Failed to update prompt name for prompt ${promptID}.`)
      } else {
        const updatedPromptNames = promptNames.map((item) => {
          if (item.promptID === promptID) {
            return { ...item, promptName: newPromptName }
          }
          return item
        })
        setPromptNames(updatedPromptNames)
      }
    } catch (error) {
      console.error("Error updated prompt name:", error)
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
      onChange={handleEdit}
      onKeyDown={handleKeyDown}
      onBlur={commitEdit}
      className="promptItem"
      style={{ color: "#a5bcf6" }}
      autoFocus
    />
  ) : (
    <div onClick={handleTitleClick} className="promptItem">
      {title}
    </div>
  )
}
