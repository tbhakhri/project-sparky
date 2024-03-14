import React, { useState } from "react";
import { Kumbh_Sans } from 'next/font/google'
import "./ChatBubble.css";
 
const kumbh_sans = Kumbh_Sans({ subsets: ['latin'] })

export default function ModelBubble() {
  const text = "This is a DUMMY RESPONSE to the user's message!!"

  return (
    <div className="model-container">
        <div className={kumbh_sans.className}>
            <p className="modelBubble">{text}</p>
        </div>
    </div>
  );
}
