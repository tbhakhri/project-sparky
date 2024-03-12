import Image from 'next/image';
import "./TopBar.css";

export default function TopBar() {
    return (
        <div className="topBarContainer">
            <button className="historyButton">
                <Image src="/history-button.svg" alt = "historyButton" width={20} height={20}/>
            </button>
            <Image src="/sparkyLogo.svg" alt="sparky logo" width={115} height={50}/>
        </div>
    )
}