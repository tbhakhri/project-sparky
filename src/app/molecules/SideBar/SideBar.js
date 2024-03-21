import "./SideBar.css";
import Image from "next/image";

export default function SideBar({ toggleSidebar }) {
  return (
    <div className="sideBarContainer">
      <button className="historyButton" onClick={toggleSidebar}>
        <Image
          src="/history-button.svg"
          alt="historyButton"
          width={20}
          height={20}
        />
      </button>
      <div className="menuBarContainer">
        helllllllo
        <div className="menuBarItem">?</div>
        <div className="menuBarItem">Menu</div>
        <div className="menuBarItem">L</div>
      </div>
      <div className="currentPromptContainer">
        <div className="promptItem"> insert prompt here</div>
      </div>
      <div className="pastPromptContainer">
        <div className="promptItem"> insert prompt here</div>
        <div className="promptItem"> insert prompt here</div>
      </div>
      <div>Hello</div>
    </div>
  );
}
