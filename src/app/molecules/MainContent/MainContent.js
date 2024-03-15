import ChatBubble from "../ChatBubble/ChatBubble";
import ModelBubble from "../ChatBubble/ModelBubble";
import "./MainContent.css";
import { useData } from "@/molecules/DataContext/DataContext";

export default function MainContent() {
  const { data } = useData();

  return (
    <div className="mainContentContainer">
      {data.chatBubbles.map((chatBubble, index) =>
        chatBubble.type == "user" ? (
          <ChatBubble text={chatBubble.text} index={chatBubble.index} />
        ) : (
          <ModelBubble index={chatBubble.index} />
        )
      )}
    </div>
  );
}
