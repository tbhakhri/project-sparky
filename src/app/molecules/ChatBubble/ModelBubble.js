import Image from "next/image"
import "./ChatBubble.css"
import { useData } from "%/DataContext"
import Arrow from "@/molecules/Arrow/Arrow"
import Markdown from "react-markdown" 

export default function ModelBubble({ variant }) {
  const { currentPrompt, addResponse, setCurrentResponseIndex } = useData()

  const curIndex = currentPrompt.variants[variant].currentResponseIndex
  const responses = currentPrompt.variants[variant].currentResponses
  const numResponses = responses.length

  const handleRegenerate = async () => {
    try {
      await addResponse(variant)
      setCurrentResponseIndex(variant, numResponses)
    } catch (error) {
      console.error("Error in addResponse:", error.message)
    }
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
              onClick={(_) => setCurrentResponseIndex(variant, curIndex - 1)}
              style={{ cursor: curIndex === 0 ? "default" : "pointer" }}
            >
              <Arrow isLeft={true} fill={curIndex === 0 ? "grey" : "#ffffff"} />
            </button>
            <button
              className="leftRightButton"
              disabled={curIndex === numResponses - 1}
              onClick={(_) => setCurrentResponseIndex(variant, curIndex + 1)}
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

      <Markdown className="modelBubble">{responses[curIndex].data}</Markdown>
      <button
        className="regenerateButton"
        onClick={handleRegenerate}
        style={{ marginTop: "0.1rem" }}
      >
        <Image src="/regenerate.svg" alt="Regenerate" width={12} height={12} />
      </button>
    </div>
  )
}
