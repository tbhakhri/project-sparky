import ChatBubble from "../ChatBubble/ChatBubble";
import ModelBubble from "../ChatBubble/ModelBubble";
import "./MainContent.css";
import { useData } from "@/molecules/DataContext/DataContext";
import Image from "next/image";

export default function MainContent() {
  const { data } = useData();

  const renderBubble = (item) => {
    switch (item.type) {
      case "user":
        return <ChatBubble text={item.text} />;
      case "response":
        return <ModelBubble />;
      case "image":
        return (
          <div style={{ width: "100%", height: "100%", position: "relative" }}>
            <Image src={item.text} />
          </div>
        );
      default:
        return null; // Or a default component if you have one
    }
  };

  return (
    <div className="mainContentContainer">
      {/* {data.chatBubbles.map((chatBubble, index) =>
        chatBubble.type == "user" ? (
          <ChatBubble text={chatBubble.text} />
        ) : (
          <ModelBubble />
        )
      )} */}
      {data.chatBubbles.map(renderBubble)}
    </div>
  );
}
