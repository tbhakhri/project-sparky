import React from "react"

import "./MainContent.css"
import ChatBubble from "@/molecules/ChatBubble/ChatBubble"
import ModelBubble from "@/molecules/ChatBubble/ModelBubble"
import ImageBubble from "@/molecules/ChatBubble/ImageBubble"
import { useData } from "%/DataContext"
import DefaultScreen from "@/molecules/DefaultScreen/DefaultScreen"

export default function MainContent() {
  const { data } = useData()

  const renderBubble = (item, index) => {
    switch (item.type) {
      case "text":
        return <ChatBubble text={item.text} index={index} />
      case "image":
        return <ImageBubble imageURL={item.text} index={index} />
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
            <React.Fragment key={variantIndex}>
              <p className="userText">User</p>
              {variant.chatBubbles.map((item, requestIndex) =>
                renderBubble(item, requestIndex)
              )}
              {variant.responses.length > 0 && <ModelBubble />}
            </React.Fragment>
          ))}
        </>
      )}
    </div>
  )
}
