import IdeaBox from "./IdeaBox/IdeaBox.js"
import "./DefaultScreen.css"

export default function DefaultScreen() {
  return (
    <div className="defaultScreenContainer">
      <div className="introText">Experiment. Prototype. Create.</div>
      <div className="ideaBoxContainer">
        <div className="ideaBoxItem">
          <IdeaBox
            text="Write a story about a magic backpack"
            pathToSvg="/textbox.svg"
            alt="ideaBoxWriteStory"
            id="0"
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            text="Take a photo of your food and ask me for the recipe"
            pathToSvg="/camerafordefaultscreen.svg"
            alt="ideaBoxFoodPhoto"
            id="1"
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            text="Hum a tune and ask me to identify the song"
            pathToSvg="/audio.svg"
            alt="ideaBoxIdentifySong"
            id="2"
          />
        </div>
        <div className="ideaBoxItem">
          <IdeaBox
            text="Insert an image and ask me anything about it"
            pathToSvg="/landscape.svg"
            alt="ideaBoxPhotoAskMe"
            id="3"
          />
        </div>
      </div>
    </div>
  )
}
