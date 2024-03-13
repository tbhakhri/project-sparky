import "./MainContent.css";
import DefaultScreen from "../DefaultScreen/DefaultScreen.js"

export default function MainContent({ requestChain, responses }) {
    return (
        <div className="mainContentContainer">
            {
                requestChain.length === 0 ? (
                    <>
                  
                    <div className ="defaultScreenContainer">
                        <DefaultScreen/>   
                    </div>
                    </>
                ) : (
                    <>
                    DISPLAY ALL THE REQUESTS AND RESPONSES AND STUFF
                    </>
                )
            }
        </div>
    )
}