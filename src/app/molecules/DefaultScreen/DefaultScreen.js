import IdeaBox from "./IdeaBox/IdeaBox.js"
import { useData } from "%/DataContext"
import "./DefaultScreen.css"

export default function DefaultScreen() {
  const {
    text,
    setText,
    handleImageSelect,
    pushUserText,
    addResponse,
    handleRun,
    put,
    setQueueRun,
  } = useData()

//   const boxOneClick = () => {
//     pushUserText("Tell me a story about a magic backpack.")
//   }

//   const boxTwoClick = (e) => {
//     pushUserText("Take a photo of your food and ask me for the recipe")
//     const fileInput = document.getElementById('fileInput');
//     fileInput.click();
// }

  
//   const boxThreeClick = (e) => {
//     handleImageSelect(e)
//   }


  return (
    <div className="defaultScreenContainer">
      <div className="introText">Experiment. Prototype. Create.</div>
      <div className="ideaBoxContainer">
        <div className="ideaBoxItem">
          <IdeaBox
            displayText="Write a story about a magic backpack"
            inputText = "Write a story about a magic backpack"
            pathToSvg="/textbox.svg"
            alt="hi"
            involvesImage={false}
            imageAndText={false}
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            displayText="Take a photo of your food and ask me for the recipe"
            inputText = "What is the recipe of this dish?"
            pathToSvg="/camerafordefaultscreen.svg"
            alt="bye"
            involvesImage={true}
            imageAndText={true}
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            displayText="Hum a tune and ask me to identify the song"
            inputText="What is the song I am humming?"
            pathToSvg="/audio.svg"
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            displayText="Insert an image and ask me anything about it"
            inputText=""
            pathToSvg="/landscape.svg"
            alt="hi"
            involvesImage={true}
            imageAndText={false}

          />
        </div>
      </div>
    </div>
  )
}
