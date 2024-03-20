import React, { useState } from "react"
import Image from "next/image"
import "./ChatBubble.css"
import { useData } from "%/DataContext"

export default function ModelBubble() {
  const { data, addResponse } = useData()

  const [curIndex, setCurIndex] = useState(0)
  const numResponses = data.responses.length

  //TODO: CHANGE WHEN BACKEND IS IMPLEMENTED
  const handleRegenerate = (e) => {
    addResponse()
    setCurIndex(numResponses)
  }

  return (
    <div className="modelContainer">
      {numResponses > 1 && (
        <div>
          {/* NEED TO MAKE BUTTON NOT CLICKABLE AT CERTAIN INDEXES */}
          <button
            className="iconButton"
            onClick={(_) => setCurIndex((prev) => prev - 1)}
          >
            <Image
              src="/regenerate.svg"
              alt="Regenerate"
              width={10}
              height={10}
            />
          </button>
          <button
            className="iconButton"
            onClick={(_) => setCurIndex((prev) => prev + 1)}
          >
            {" "}
            <Image
              src="/regenerate.svg"
              alt="Regenerate"
              width={10}
              height={10}
            />
          </button>
        </div>
      )}
      <p className="modelBubble">{data.responses[curIndex].text}</p>
      {/* TODO: RENAME EDITDELETEBUTTON */}
      <button className="regenerateButton" onClick={handleRegenerate}>
        <Image src="/regenerate.svg" alt="Regenerate" width={12} height={12} />
      </button>
    </div>
  )
}
