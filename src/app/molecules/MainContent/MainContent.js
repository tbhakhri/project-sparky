import "./MainContent.css"

export default function MainContent({ requestChain, responses }) {
    return (
        <div className="mainContentContainer">
            {
                requestChain.length === 0 ? (
                    <>
                    DEFAULT SCREEN
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