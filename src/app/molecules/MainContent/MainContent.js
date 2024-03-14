import ChatBubble from "../ChatBubble/ChatBubble";
import "./MainContent.css";
import { useData } from "@/molecules/DataContext/DataContext";

export default function MainContent() {
  const { data } = useData();

  return (
    <div className="mainContentContainer">
      {data.texts.map((text, index) => (
        <ChatBubble key={index} text={text} />
      ))}
    </div>
  );
}
