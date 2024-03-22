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
      case "user":
        return <ChatBubble text={item.text} index={index} />
      case "response":
        return <ModelBubble />
      case "image":
        return <ImageBubble imageURL={item.text} index={index} />
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
          {data.chatBubbles.map((item, index) => renderBubble(item, index))}
          {data.responses.length > 0 && <ModelBubble />}
        </>
      )}
    </div>
  )
}
