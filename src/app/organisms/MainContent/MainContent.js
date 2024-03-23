import "./MainContent.css"
import ChatBubble from "@/molecules/ChatBubble/ChatBubble"
import ModelBubble from "@/molecules/ChatBubble/ModelBubble"
import ImageBubble from "@/molecules/ChatBubble/ImageBubble"
import { useData } from "%/DataContext"
import DefaultScreen from "@/molecules/DefaultScreen/DefaultScreen"

export default function MainContent() {
  const { data, setCurrentVariant } = useData()

  const renderBubble = (item, requestIndex, variantIndex) => {
    switch (item.type) {
      case "text":
        return (
          <ChatBubble
            text={item.text}
            index={requestIndex}
            variant={variantIndex}
          />
        )
      case "image":
        return (
          <ImageBubble
            imageURL={item.text}
            index={requestIndex}
            variant={variantIndex}
          />
        )
      default:
        return null
    }
  }

  return (
    <div className="mainContentContainer">
      {data.variants.length === 1 &&
      data.variants[0].chatBubbles.length === 0 ? (
        <>
          <div className="defaultScreenContainer">
            <DefaultScreen />
          </div>
        </>
      ) : (
        <>
          {data.variants.map((variant, variantIndex) => (
            <div
              key={variantIndex}
              className="variantContainer"
              style={{
                borderColor:
                  variantIndex === data.currentVariant
                    ? "#a5bcf6"
                    : "rgba(0,0,0,0)"
              }}
              onClick={() => setCurrentVariant(variantIndex)}
            >
              <p className="userText">User</p>
              {variant.chatBubbles.map((item, requestIndex) =>
                renderBubble(item, requestIndex, variantIndex)
              )}
              {variant.responses.length > 0 && <ModelBubble />}
            </div>
          ))}
        </>
      )}
    </div>
  )
}
