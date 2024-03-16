import "./MainContent.css"
import ChatBubble from "@/molecules/ChatBubble/ChatBubble"
import ModelBubble from "@/molecules/ChatBubble/ModelBubble"
import ImageBubble from "@/molecules/ChatBubble/ImageBubble"
import { useData } from "%/DataContext"
import DefaultScreen from "@/molecules/DefaultScreen/DefaultScreen"

export default function MainContent() {
  const { data } = useData()

  const renderBubble = (item) => {
    console.log(item.index)
    switch (item.type) {
      case "user":
        return <ChatBubble text={item.text} index={item.index} />
      case "response":
        return <ModelBubble index={item.index} />
      case "image":
        return <ImageBubble imageURL={item.text} index={item.index} />
      default:
        return null // Or a default component if you have one
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
        <>{data.chatBubbles.map(renderBubble)}</>
      )}
    </div>
  )
}
