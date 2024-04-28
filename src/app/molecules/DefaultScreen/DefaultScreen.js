import IdeaBox from "./IdeaBox/IdeaBox.js"
import "./DefaultScreen.css"

export default function DefaultScreen() {
  return (
    <div className="defaultScreenContainer">
      <div className="introText">Experiment. Prototype. Create.</div>
      <div className="ideaBoxContainer">
        <div className="ideaBoxItem">
          <IdeaBox
            id="0"
            text="Write a story about a magic backpack"
            pathToSvg="/textbox.svg"
            alt="hi"
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            id="1"
            text="Take a photo of your food and ask me for the recipe"
            pathToSvg="/camerafordefaultscreen.svg"
            alt="bye"
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            id="2"
            text="Hum a tune and ask me to identify the song"
            pathToSvg="/audio.svg"
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            id="3"
            text="Insert an image and ask me anything about it"
            pathToSvg="/landscape.svg"
            alt="hi"
          />
        </div>
      </div>
    </div>
  )
}
