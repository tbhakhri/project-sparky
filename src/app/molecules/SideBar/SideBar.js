import "./SideBar.css"
import Image from "next/image"
import React, { useState } from "react"
import { useData } from "%/DataContext"
import PromptTitles from "@/molecules/SideBar/PromptTitles"

export default function SideBar({ toggleSidebar }) {
  const {
    currentPrompt,
    addPrompt,
    prompts,
    updateTitle,
    editPrompt,
    selectPrompt,
    deletePrompt
  } = useData()
  const { promptTitles } = prompts
  const [editingIndex, setEditingIndex] = useState(-1)

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
          {/* could give className=icon */}
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
            addPrompt()
            toggleSidebar()
          }}
        >
          New Prompt
        </button>
      </div>
      <div className="currentPromptContainer">
        <div className="promptHeaderText">Current Prompt</div>
        <div className="promptItem2">
          {currentPrompt.variants[currentPrompt.currentVariant].currentRequests
            .length > 0
            ? currentPrompt.variants[currentPrompt.currentVariant]
                .currentRequests[0].text
            : "start typing..."}
        </div>
      </div>
      <div className="pastPromptContainer">
        <div className="promptHeaderText">Past Prompts</div>
        {promptTitles.map((title, index) => (
          <div key={index} className="promptItemContainer">
            <PromptTitles
              initialTitle={title}
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
              onClick={() => deletePrompt(index)}
              className="deletePromptButton"
            >
              <Image
                src="/promptClear.svg"
                alt={`Delete image ${index + 1}`}
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
