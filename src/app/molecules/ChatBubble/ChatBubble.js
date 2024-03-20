import { Kumbh_Sans } from "next/font/google"
import "./ChatBubble.css"
import Image from "next/image"

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] })

export default function ChatBubble({ text }) {
  return (
    <div className="bubble-container">
      <button className="editDeleteButton">
        <Image src="/edit.svg" alt="Edit text" width={10} height={10} />
      </button>
      <button className="editDeleteButton">
        <Image
          src="/x-button-white.svg"
          alt="Delete text"
          width={10}
          height={10}
        />
      </button>
      <></>
      <div className={kumbh_sans.className}>
        <p className="chatBubble">{text}</p>
      </div>
    </div>
  )
}
