import ChatBubble from "../ChatBubble/ChatBubble";
import ModelBubble from "../ChatBubble/ModelBubble";
import ImageBubble from "../ChatBubble/ImageBubble";
import "./MainContent.css";
import { useData } from "@/molecules/DataContext/DataContext";
import Image from "next/image";

export default function MainContent() {
  const { data } = useData();

  const renderBubble = (item) => {
    console.log(item.index);
    switch (item.type) {
      case "user":
        return <ChatBubble text={item.text} index={item.index} />;
      case "response":
        return <ModelBubble index={item.index} />;
      case "image":
        return <ImageBubble imageURL={item.text} index={item.index} />;
      default:
        return null; // Or a default component if you have one
    }
  };

  return (
    <div className="mainContentContainer">
      {/* {data.chatBubbles.map((chatBubble, index) =>
        chatBubble.type == "user" ? (
          <ChatBubble text={chatBubble.text} index={chatBubble.index} />
        ) : (
          <ModelBubble index={chatBubble.index} />
        )
      )} */}
      {data.chatBubbles.map(renderBubble)}
    </div>
  );
}
