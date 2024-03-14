import "./MainContent.css";
import { useData } from "@/molecules/DataContext/DataContext";

export default function MainContent() {
  const { data } = useData();

  return (
    <div className="mainContentContainer">
      MAIN CONTENT
      {data.texts.map((text, index) => (
        <p key={index}>{text}</p>
      ))}
    </div>
  );
}
