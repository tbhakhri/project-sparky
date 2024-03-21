import "./SideBar.css";
import Image from "next/image";

export default function SideBar({ toggleSidebar }) {
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
          <Image src="/help-button.svg" alt="help" width={25} height={25} style={{margin: '-2px'}}/>
          {/* could give className=icon */}
        </div>
        <div className="menuBarItem">
          <div className="menuBarText">
            Menu
          </div>
        </div>
        <div className="menuBarItem">
        <button className="closeMenuButton" onClick={toggleSidebar}>
            <Image src="/close-menu.svg" alt="help" width={17} height={17} style={{margin: '2px'}}/>
          </button>
        </div>
      </div>
      <div className="newPromptButtonContainer">
        <button className="newPromptButton" onclick={toggleSidebar}>
          New Prompt 
        </button>
      </div>
      <div className="currentPromptContainer">
        <div className="promptHeaderText">
          Current Prompt
        </div>
        <div className="promptItem"> Insert prompt here</div>
      </div>

      <div className="pastPromptContainer">
      <div className="promptHeaderText">
          Past Prompts
        </div>
        <div className="promptItem"> Insert prompt here</div>
        <div className="promptItem"> Insert prompt here</div>
        <div className="promptItem"> Insert prompt here</div>
      </div>  
    </div>
  );
}
