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
            text="Write a story about a magic backpack"
            pathToSvg="/textbox.svg"
            alt="hi"
            involvesImage={false}
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            text="Take a photo of your food and ask me for the recipe"
            pathToSvg="/camerafordefaultscreen.svg"
            alt="bye"
            involvesImage={true}
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            text="Hum a tune and ask me to identify the song"
            pathToSvg="/audio.svg"
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            text="Insert an image and ask me anything about it"
            pathToSvg="/landscape.svg"
            alt="hi"
            involvesImage={true}
          />
        </div>
      </div>
    </div>
  )
}
