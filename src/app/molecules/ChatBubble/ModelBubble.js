import Image from "next/image"
import "./ChatBubble.css"
import { useData } from "%/DataContext"
import Arrow from "@/molecules/Arrow/Arrow"

export default function ModelBubble() {
  const { data, addResponse } = useData()

  const curIndex = data.variants[data.currentVariant].currentResponseIndex
  const responses = data.variants[data.currentVariant].responses
  const numResponses = responses.length

  //TODO: CHANGE WHEN BACKEND IS IMPLEMENTED
  const handleRegenerate = (e) => {
    addResponse()
    setCurrentResponseIndex(numResponses)
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
              onClick={(_) => setCurrentResponseIndex((prev) => prev - 1)}
              style={{ cursor: curIndex === 0 ? "default" : "pointer" }}
            >
              <Arrow isLeft={true} fill={curIndex === 0 ? "grey" : "#ffffff"} />
            </button>
            <button
              className="leftRightButton"
              disabled={curIndex === numResponses - 1}
              onClick={(_) => setCurrentResponseIndex((prev) => prev + 1)}
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

      <p className="modelBubble">{responses[curIndex].text}</p>
      <button
        className="regenerateButton"
        onClick={handleRegenerate}
        style={{ marginTop: "0.1rem" }}
      >
        <Image src="/regenerate.svg" alt="Regenerate" width={10} height={10} />
      </button>
    </div>
  )
}
