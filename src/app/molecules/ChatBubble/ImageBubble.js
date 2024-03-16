import { Kumbh_Sans } from "next/font/google"
import "./ChatBubble.css"
import Image from "next/image"

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] })

export default function ImageBubble({ imageURL, index }) {
  return (
    <div className="bubble-container">
      <div style={{ width: "100px", position: "relative" }}>
        {/* <div className={kumbh_sans.className}>
          {index == 0 && <p className="userText">User</p>}
        </div> */}
        <Image
          src={imageURL}
          alt="added image"
          width={50}
          height={0}
          layout="responsive"
        />
      </div>
    </div>
  )
}
