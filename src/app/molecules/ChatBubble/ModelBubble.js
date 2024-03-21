import React, { useState } from "react"
import Image from "next/image"
import "./ChatBubble.css"
import { useData } from "%/DataContext"
import Arrow from "@/molecules/Arrow/Arrow"
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
      <div className="modelContainerTop">
        <p className="modelText">Model</p>
        {numResponses > 1 && (
          <div className="toggleResponse">
            <button
              className="leftRightButton"
              disabled={curIndex === 0}
              onClick={(_) => setCurIndex((prev) => prev - 1)}
              style={{ cursor: curIndex === 0 ? "default" : "pointer" }}
            >
              <Arrow isLeft={true} fill={curIndex === 0 ? "grey" : "#ffffff"} />
            </button>
            <button
              className="leftRightButton"
              disabled={curIndex === numResponses - 1}
              onClick={(_) => setCurIndex((prev) => prev + 1)}
              style={{
                cursor: curIndex === numResponses - 1 ? "default" : "pointer"
              }}
            >
              <Arrow
                isLeft={false}
                fill={curIndex === numResponses - 1 ? "grey" : "#ffffff"}
              />
            </button>
            <p className="numResponseText">
              {curIndex + 1} / {numResponses}
            </p>
          </div>
        )}
      </div>

      <p className="modelBubble">{data.responses[curIndex].text}</p>
      {/* TODO: RENAME EDITDELETEBUTTON */}
      <button className="regenerateButton" onClick={handleRegenerate}>
        <Image src="/regenerate.svg" alt="Regenerate" width={12} height={12} />
      </button>
    </div>
  )
}
