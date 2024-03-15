import { Kumbh_Sans } from "next/font/google";
import "./ChatBubble.css";

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] });

export default function ChatBubble({ text, index }) {
  return (
    <div className="bubble-container">
      <div className={kumbh_sans.className}>
        {index == 0 && <p className="userText">User</p>}
        <p className="chatBubble">{text}</p>
      </div>
    </div>
  );
}
