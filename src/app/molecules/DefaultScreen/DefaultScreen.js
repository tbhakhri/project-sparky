import IdeaBox from "./IdeaBox/IdeaBox.js"
import { useData } from "%/DataContext"
import "./DefaultScreen.css"

export default function DefaultScreen() {
  const {
    text,
    setText,
    handleImageSelect,
  } = useData()

  const boxOneClick = () => {
    setText("Tell me a story about a magic backpack.")
    console.log("hi")
    console.log(text)
  }

  const boxTwoClick = (e) => {
    setText("What is the recipe of this dish?")
    handleImageSelect(e)
  }


  return (
    <div className="defaultScreenContainer">
      <div className="introText">Experiment. Prototype. Create.</div>
      <div className="ideaBoxContainer">
        <div className="ideaBoxItem">
          <IdeaBox
            text="Write a story about a magic backpack"
            pathToSvg="/textbox.svg"
            alt="hi"
            handleClick={boxOneClick}
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            text="Take a photo of your food and ask me for the recipe"
            pathToSvg="/camerafordefaultscreen.svg"
            alt="bye"
            handleClick={boxTwoClick}
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
            handleClick={handleImageSelect}
          />
        </div>
      </div>
    </div>
  )
}
