import "./SideBar.css"
import Image from "next/image"
import { useState, useContext } from "react"
import { useData } from "%/DataContext"
import AuthContext from "%/authContext"

import PromptTitles from "@/molecules/SideBar/PromptTitles"

export default function SideBar({ toggleSidebar }) {
  const { user } = useContext(AuthContext)

  const {
    currentPrompt,
    setCurrentPrompt,
    promptNames,
    setPromptNames,
    isCurrentPromptEmpty,
    initializeNewPrompt
  } = useData()

  const pastPrompts = promptNames.filter(
    (item) => item.promptID !== currentPrompt.promptID
  )
  const [editingIndex, setEditingIndex] = useState(-1)

  async function savePrompt() {
    try {
      let response = await fetch("/api/storePromptName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: user.uid,
          promptName: currentPrompt.promptName,
          promptID: currentPrompt.promptID
        })
      })

      if (!response.ok) {
        console.error("Failed to store promptName.")
      }

      response = await fetch("/api/storePromptData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          variants: currentPrompt.variants,
          hasGeneratedName: currentPrompt.hasGeneratedName,
          promptID: currentPrompt.promptID
        })
      })

      if (!response.ok) {
        console.error("Failed to store promptData.")
      }
    } catch (error) {
      console.error("Error saving prompt:", error)
    }
  }

  /* If currentPrompt is not empty, save the currentPrompt and add currentPrompt to promptNames. Open a new prompt. */
  async function openNewPrompt() {
    if (!isCurrentPromptEmpty()) {
      savePrompt()
      const existingIndex = promptNames.findIndex(
        (item) => item.promptID === currentPrompt.promptID
      )

      if (existingIndex === -1) {
        setPromptNames([
          ...promptNames,
          {
            promptID: currentPrompt.promptID,
            promptName: currentPrompt.promptName
          }
        ])
      }
    } else {
      console.log("Current Prompt is empty, no need to save")
    }
    initializeNewPrompt()
  }

  /* If currentPrompt is not empty, save the currentPrompt and add currentPrompt to promptNames.
   Loads the selected prompt into currentPrompt. */
  async function selectPrompt(promptID, promptName) {
    if (!isCurrentPromptEmpty()) {
      savePrompt()
      const existingIndex = promptNames.findIndex(
        (item) => item.promptID === currentPrompt.promptID
      )

      if (existingIndex === -1) {
        setPromptNames([
          ...promptNames,
          {
            promptID: currentPrompt.promptID,
            promptName: currentPrompt.promptName
          }
        ])
      }
    } else {
      console.log("Current Prompt is empty, no need to save")
    }

    // fetch prompt data and set it
    const url = new URL("/api/getPromptData", window.location.origin)
    url.searchParams.append("promptID", promptID)
    const response = await fetch(url.toString(), {
      method: "GET"
    })
    if (response.status === 404) {
      console.error("No prompt found for prompt", promptID)
    } else {
      const data = await response.json()
      setCurrentPrompt({ ...data, promptName: promptName })
    }
  }

  /* Deletes the prompt from promptNames state, the firebase db, and firebase storage */
  async function deletePrompt(promptID) {
    try {
      const response = await fetch("/api/deletePrompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: user.uid,
          promptID: promptID
        })
      })

      if (!response.ok) {
        console.error("Error deleting prompt:", await response.text())
        return
      }

      console.log("Prompt deleted successfully")
      // You can potentially update local state here (if needed)
      setPromptNames((prev) =>
        prev.filter((item, _) => item.promptID !== promptID)
      )
    } catch (error) {
      console.error("Error calling deletePrompt API:", error)
    }
  }

  return (
    <div className="sideBarContainer">
      <div className="menuBarContainer">
        <div className="menuBarItem">
          <Image
            src="/help-button.svg"
            alt="help"
            width={25}
            height={25}
            style={{ margin: "-2px" }}
          />
        </div>
        <div className="menuBarItem">
          <div className="menuBarText">Menu</div>
        </div>
        <div className="menuBarItem">
          <button className="closeMenuButton" onClick={toggleSidebar}>
            <Image
              src="/close-menu.svg"
              alt="help"
              width={17}
              height={17}
              style={{ margin: "2px" }}
            />
          </button>
        </div>
      </div>

      <div className="newPromptButtonContainer">
        <button
          className="newPromptButton"
          onClick={() => {
            openNewPrompt()
            toggleSidebar()
          }}
        >
          New Prompt
        </button>
      </div>
      <div className="currentPromptContainer">
        <div className="promptHeaderText">Current Prompt</div>
        <div className="promptItem2">{currentPrompt.promptName}</div>
      </div>
      <div className="pastPromptContainer">
        <div className="promptHeaderText">Past Prompts</div>
        {pastPrompts.map((item, index) => (
          <div key={item.promptID} className="promptItemContainer">
            <PromptTitles
              initialTitle={item.promptName}
              promptID={item.promptID}
              index={index}
              isEditing={editingIndex === index}
              setEditing={setEditingIndex}
              selectPrompt={selectPrompt}
              toggleSidebar={toggleSidebar}
            />

            <button
              onClick={() => setEditingIndex(index)}
              className="editPromptButton"
            >
              <Image
                src="/editPrompt.svg"
                alt={`edit image ${index + 1}`}
                width={15}
                height={15}
              />
            </button>

            <button
              onClick={() => {
                deletePrompt(item.promptID)
              }}
              className="deletePromptButton"
            >
              <Image
                src="/promptClear.svg"
                alt={`Delete prompt ${index + 1}`}
                width={15}
                height={15}
              />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
