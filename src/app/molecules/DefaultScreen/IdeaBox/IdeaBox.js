import "./IdeaBox.css"
import Image from "next/image"
import { useData } from "%/DataContext"

export default function IdeaBox({ id, text, pathToSvg, alt }) {
  const { pushUserText } = useData()

  const handleClick = () => {
    if (id === "0") {
      pushUserText(text)
    }

    if (id === "1") {
      pushUserText("What is the recipe for this dish?")
      const imageInput = document.getElementById("imageInput")
      imageInput.click()
    }

    if (id === "2") {
      pushUserText(text)
    }

    if (id === "3") {
      const imageInput = document.getElementById("imageInput")
      imageInput.click()
    }
  }
  return (
    <div className="box" onClick={handleClick}>
      <Image src={pathToSvg} className="img" alt={alt} width={15} height={15} />
      <br /> <div className="text">{text}</div>
    </div>
  )
}
