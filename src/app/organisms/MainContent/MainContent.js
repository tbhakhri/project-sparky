import "./MainContent.css"
import styles from "@/page.module.css"
import ChatBubble from "@/molecules/ChatBubble/ChatBubble"
import ModelBubble from "@/molecules/ChatBubble/ModelBubble"
import ImageBubble from "@/molecules/ChatBubble/ImageBubble"
import AudioBubble from "@/molecules/ChatBubble/AudioBubble"
import { useData } from "%/DataContext"
import DefaultScreen from "@/molecules/DefaultScreen/DefaultScreen"

export default function MainContent() {
  const {
    isResponseLoading,
    currentPrompt,
    setCurrentVariant,
    copyVariant,
    isCurrentPromptEmpty,
    isCurrentPromptLoading
  } = useData()

  const renderBubble = (isCurrent, item, requestIndex, variantIndex) => {
    switch (item.type) {
      case "text":
        return (
          <ChatBubble
            key={requestIndex}
            isCurrent={isCurrent}
            initialText={item.data}
            index={requestIndex}
            variant={variantIndex}
          />
        )
      case "image":
        return (
          <ImageBubble
            key={requestIndex}
            isCurrent={isCurrent}
            imageURL={item.data}
            index={requestIndex}
            variant={variantIndex}
          />
        )
      case "audio":
        return (
          <AudioBubble
            key={requestIndex}
            isCurrent={isCurrent}
            index={requestIndex}
            variant={variantIndex}
          />
        )
      case "modelText":
        return (
          <div key={requestIndex} className="modelContainer">
            <p className="modelBubble">{item.data}</p>
          </div>
        )
      default:
        return null
    }
  }
  console.log("isCurrentPromptLoading", isCurrentPromptLoading)
  return (
    <div className="mainContentContainer">
      {isCurrentPromptEmpty() ? (
        <>
          <div className="defaultScreenContainer">
            <DefaultScreen />
          </div>
        </>
      ) : isCurrentPromptLoading ? (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <div className={styles.loader}></div>
        </div>
      ) : (
        <>
          {currentPrompt.variants.map((variant, variantIndex) => (
            <div
              key={variantIndex}
              className="variantContainer"
              style={{
                borderColor:
                  variantIndex === currentPrompt.currentVariant
                    ? "#a5bcf6"
                    : "rgba(0,0,0,0)"
              }}
              onClick={() => setCurrentVariant(variantIndex)}
            >
              {variant.variantHistory.map((item, _) =>
                renderBubble(false, item, _, variantIndex)
              )}

              <p className="userText">User</p>
              {variant.currentRequests.map((item, requestIndex) =>
                renderBubble(true, item, requestIndex, variantIndex)
              )}

              {isResponseLoading[variantIndex] && (
                <>
                  <div className="loading-dots"></div>
                </>
              )}
              {variant.currentResponses.length > 0 && (
                <ModelBubble variant={variantIndex} />
              )}
              <button
                className="compareButton"
                onClick={(_) => copyVariant(variantIndex)}
                disabled={currentPrompt.variants.length >= 3}
                style={{
                  backgroundColor: currentPrompt.variants.length >= 3 && "grey"
                }}
              >
                {currentPrompt.variants.length >= 3
                  ? "Max 3 Variants"
                  : "Compare"}
              </button>
            </div>
          ))}
        </>
      )}
    </div>
  )
}
