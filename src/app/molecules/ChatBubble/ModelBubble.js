<<<<<<< HEAD
import React, { useState } from "react";
import { Kumbh_Sans } from "next/font/google";
import Image from "next/image";
import "./ChatBubble.css";

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] });

export default function ModelBubble({ index }) {
  // console.log(index);
  const text = "This is a DUMMY RESPONSE to the user's message!!";

  return (
    <div className="model-container">
      <div className={kumbh_sans.className}>
        {index == 0 && <p className="modelText">Model</p>}
        <p className="modelBubble">{text}</p>
        <div className="configs-container">
          <Image
            src="/regenerate.svg"
            alt="Regenerate"
            width={12}
            height={12}
            style={{ marginRight: "6px" }}
          />
          <Image src="/edit.svg" alt="Edit" width={12} height={12} />
        </div>
      </div>
=======
import Image from "next/image"
import "./ChatBubble.css"
import { useData } from "%/DataContext"
import Arrow from "@/molecules/Arrow/Arrow"

export default function ModelBubble({ variant }) {
  const { data, addResponse, setCurrentResponseIndex } = useData()

  const curIndex = data.variants[variant].currentResponseIndex
  const responses = data.variants[variant].responses
  const numResponses = responses.length

  //TODO: CHANGE WHEN BACKEND IS IMPLEMENTED
  const handleRegenerate = (e) => {
    addResponse(variant)
    setCurrentResponseIndex(variant, numResponses)
  }

  return (
    <div className="modelContainer">
      <div className="modelContainerTop">
        <p className="modelText">Model</p>
        {numResponses > 1 && (
          <div className="toggleResponse">
            <button
              className="leftRightButton"
              disabled={curIndex === 0}
              onClick={(_) => setCurrentResponseIndex(variant, curIndex - 1)}
              style={{ cursor: curIndex === 0 ? "default" : "pointer" }}
            >
              <Arrow isLeft={true} fill={curIndex === 0 ? "grey" : "#ffffff"} />
            </button>
            <button
              className="leftRightButton"
              disabled={curIndex === numResponses - 1}
              onClick={(_) => setCurrentResponseIndex(variant, curIndex + 1)}
              style={{
                cursor: curIndex === numResponses - 1 ? "default" : "pointer"
              }}
            >
              <Arrow
                isLeft={false}
                fill={curIndex === numResponses - 1 ? "grey" : "#ffffff"}
              />
            </button>
            <p className="numResponseText">
              {curIndex + 1} / {numResponses}
            </p>
          </div>
        )}
      </div>

      <p className="modelBubble">{responses[curIndex].text}</p>
      <button
        className="regenerateButton"
        onClick={handleRegenerate}
        style={{ marginTop: "0.1rem" }}
      >
        <Image src="/regenerate.svg" alt="Regenerate" width={10} height={10} />
      </button>
>>>>>>> 52b50daed0a6c771388e8ff55f7314e534951e91
    </div>
  )
}
