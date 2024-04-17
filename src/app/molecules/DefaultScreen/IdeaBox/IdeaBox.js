import "./IdeaBox.css"
import Image from "next/image"

export default function IdeaBox({ text, pathToSvg, alt }) {
  return (
    <div className="box">
      <Image src={pathToSvg} className="img" alt={alt} width={15} height={15} />
      <br /> <div className="text">{text}</div>
    </div>
  )
}
