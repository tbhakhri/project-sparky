import React, { useState } from "react";
import { Kumbh_Sans } from "next/font/google";
import "./ChatBubble.css";

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] });

export default function ChatBubble({ text }) {
  return (
    <div className="bubble-container">
      <div className={kumbh_sans.className}>
        <p className="chatBubble">{text}</p>
      </div>
    </div>
  );
}
