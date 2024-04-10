import "./SideBar.css";
import Image from "next/image";
import React, { createContext, useState, useContext } from "react";

// import DataProvider from './DataContext/DataContext.js';
import { useData } from "@/molecules/DataContext/DataContext";
import PromptTitles from "@/molecules/SideBar/PromptTitles"

export default function SideBar({ toggleSidebar }) {
  const { data, addPrompt, prompts, updateTitle, deletePrompt } = useData(); // Assuming you want to access the entire state to get chatBubbles
  const { chatBubbles } = data;
  const { promptTitles } = prompts;

  console.log('DATA', data, chatBubbles)
  console.log('PROMPT TITLES', promptTitles)

  return (
    <div className="sideBarContainer">
      {/* <button className="historyButton" onClick={toggleSidebar}>
        <Image
          src="/history-button.svg"
          alt="historyButton"
          width={20}
          height={20}
        />
      </button> */}
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
            addPrompt();
            toggleSidebar();
          }}
        >
          New Prompt
        </button>
      </div>
      <div className="currentPromptContainer">
        {/* <div className="promptHeaderText">
          {chatBubbles.length > 0 ? chatBubbles[0].text : "Insert Prompt Here"}
        </div> */}

        <div className="promptItem">
          {" "}
          {chatBubbles.length > 0 ? chatBubbles[0].text : "Insert Prompt Here"}
        </div>
      </div>
      <div className="pastPromptContainer">
        <div className="promptHeaderText">Past Prompts</div>
        {/* <div className="promptItem"></div> */}
        {promptTitles.map((title, index) => (
            <PromptTitles
            key={index}
            initialTitle={title}
            index={index}
            // className={"promptItem"}
            />,
            <button 
                onClick={() => handleDelete(index)} 
                className="delete_prompt_button">
                <Image src="/x-button.svg" alt={`Delete image ${index + 1}`} width={10} height={10}/>
            </button>
        ))}
        {/* <div className="promptItem"> Insert prompt here</div>
        <div className="promptItem"> Insert prompt here</div>
        <div className="promptItem"> Insert prompt here</div> */}
      </div>
      
    </div>
  );
}
