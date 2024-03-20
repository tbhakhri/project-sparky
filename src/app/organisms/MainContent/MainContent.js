import "./MainContent.css"
import ChatBubble from "@/molecules/ChatBubble/ChatBubble"
import ModelBubble from "@/molecules/ChatBubble/ModelBubble"
import ImageBubble from "@/molecules/ChatBubble/ImageBubble"
import { useData } from "%/DataContext"
import DefaultScreen from "@/molecules/DefaultScreen/DefaultScreen"

export default function MainContent() {
  const { data } = useData()

  const renderBubble = (item) => {
    switch (item.type) {
      case "user":
        return <ChatBubble text={item.text} />
      case "response":
        return <ModelBubble />
      case "image":
        return <ImageBubble imageURL={item.text} />
      default:
        return null
    }
  }

  return (
    <div className="mainContentContainer">
      {data.chatBubbles.length === 0 ? (
        <>
          <div className="defaultScreenContainer">
            <DefaultScreen />
          </div>
        </>
      ) : (
        <>
          <p className="userText">User</p>
          {data.chatBubbles.map(renderBubble)}
          {data.responses.length > 0 && (
            <>
              <p className="modelText">Model</p>
              <ModelBubble />
            </>
          )}
        </>
      )}
    </div>
  )
}
