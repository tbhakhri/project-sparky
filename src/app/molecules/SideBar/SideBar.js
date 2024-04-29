import "./SideBar.css"
import Image from "next/image"
import { useState, useContext, useEffect } from "react"
import { useData } from "%/DataContext"
import AuthContext from "%/authContext"
import PromptTitles from "@/molecules/SideBar/PromptTitles"

export default function SideBar({ toggleSidebar, savePrompt }) {
  const { user } = useContext(AuthContext)

  const {
    currentPrompt,
    setCurrentPrompt,
    promptNames,
    setPromptNames,
    isCurrentPromptEmpty,
    initializeNewPrompt
  } = useData()

  //TODO: ADD LOADING SPINNER THAT SHOWS WHEN WE TRY TO DELETE A PROMPT

  console.log("Prompt Names", promptNames)
  const pastPrompts = promptNames.filter(
    (item) => item.promptID !== currentPrompt.promptID
  )
  // console.log("pastPrompts", pastPrompts)
  const [editingIndex, setEditingIndex] = useState(-1)
  const [queuePromptNames, setQueuePromptNames] = useState([false, null])
  const [queueLoadPrompt, setQueueLoadPrompt] = useState(null)

  useEffect(() => {
    console.log("queuePromptNames", queuePromptNames)
    if (queuePromptNames[1] !== null) {
      if (queuePromptNames[0]) {
        setPromptNames([
          ...promptNames,
          {
            promptID: currentPrompt.promptID,
            promptName: currentPrompt.promptName
          }
        ])
      }
      setQueueLoadPrompt(queuePromptNames[1])
    }
  }, [queuePromptNames])

  useEffect(() => {
    console.log("queueLoadPrompt", queueLoadPrompt)
    if (queueLoadPrompt === "newPrompt") {
      initializeNewPrompt()
      toggleSidebar()
    } else if (queueLoadPrompt !== null) {
      setCurrentPrompt(queueLoadPrompt)
      toggleSidebar()
    }
    setQueuePromptNames([false, null])
    setQueueLoadPrompt(null)
  }, [queueLoadPrompt])

  /* If currentPrompt is not empty, save the currentPrompt and add currentPrompt to promptNames. Open a new prompt. */
  async function openNewPrompt() {
    if (!isCurrentPromptEmpty()) {
      await savePrompt()
      const existingIndex = promptNames.findIndex(
        (item) => item.promptID === currentPrompt.promptID
      )

      if (existingIndex === -1) {
        setQueuePromptNames([true, "newPrompt"])
      } else {
        setQueuePromptNames([false, "newPrompt"])
      }
    } else {
      console.log("Current Prompt is empty, no need to save")
      setQueuePromptNames([false, "newPrompt"])
    }
    // initializeNewPrompt()
  }

  /* If currentPrompt is not empty, save the currentPrompt and add currentPrompt to promptNames.
   Loads the selected prompt into currentPrompt. */
  async function selectPrompt(promptID, promptName) {
    // fetch prompt data and set it
    let data = null
    const url = new URL("/api/getPromptData", window.location.origin)
    url.searchParams.append("promptID", promptID)
    const response = await fetch(url.toString(), {
      method: "GET"
    })
    if (response.status === 404) {
      console.error("No prompt found for prompt", promptID)
    } else {
      data = await response.json()
    }
    console.log("The data is, ", data)
    if (!isCurrentPromptEmpty()) {
      await savePrompt()
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
        setCurrentPrompt({ ...data, promptName: promptName })
      } else {
        setCurrentPrompt({ ...data, promptName: promptName })
      }
    } else {
      console.log("Current Prompt is empty, no need to save")
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
            // toggleSidebar()
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
