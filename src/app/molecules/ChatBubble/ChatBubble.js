import { Kumbh_Sans } from "next/font/google"
import "./ChatBubble.css"
import Image from "next/image"

import { useData } from "%/DataContext"

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] })

export default function ChatBubble({ text, index }) {
  const { data, deleteIndex } = useData()

  const handleDelete = (e) => {
    deleteIndex(index)
  }

  return (
    <div className="bubble-container">
      <button className="editDeleteButton" style={{ marginRight: "0.35rem" }}>
        <Image src="/edit.svg" alt="Edit text" width={10} height={10} />
      </button>
      <button className="editDeleteButton" onClick={handleDelete} style={{ marginRight: "0.3rem" }}>
        <Image
          src="/x-button-white.svg"
          alt="Delete text"
          width={9}
          height={9}
        />
      </button>
      <></>
      <div className={kumbh_sans.className}>
        <p className="chatBubble">{text}</p>
      </div>
    </div>
  )
}
