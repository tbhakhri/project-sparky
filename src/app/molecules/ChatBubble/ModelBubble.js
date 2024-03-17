import React, { useState } from "react"
import { Kumbh_Sans } from "next/font/google"
import Image from "next/image"
import "./ChatBubble.css"

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] })

export default function ModelBubble() {
  const text = "This is a DUMMY RESPONSE to the user's message!!"

  return (
    <div className="model-container">
      <div className={kumbh_sans.className}>
        {/* {index == 0 && <p className="modelText">Model</p>} */}
        <p className="modelBubble">{text}</p>
        <div className="configs-container">
          <Image
            src="/regenerate.svg"
            alt="Regenerate"
            width={12}
            height={12}
            style={{ marginRight: "6px" }}
          />
          <Image src="/edit.svg" alt="Edit" width={12} height={12} />
        </div>
      </div>
    </div>
  )
}
