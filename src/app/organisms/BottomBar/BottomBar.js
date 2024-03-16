import "./BottomBar.css"
import styles from "@/page.module.css"
import Image from "next/image"
import { useData } from "%/DataContext"
import { useState, useEffect } from "react"

export default function BottomBar({ tokenCount }) {
  const {
    textEmpty,
    imageEmpty,
    addUserText,
    addResponseText,
    addImages,
    clearCurrText,
    clearCurrImages,
    readyToGenerate
  } = useData()

  const handlePutButton = (e) => {
    if (!textEmpty()) {
      addUserText()
      clearCurrText()
    }
    if (!imageEmpty()) {
      addImages()
      clearCurrImages()
    }
  }

  const handleRunButton = (e) => {
    if (!textEmpty()) {
      addUserText()
      clearCurrText()
    }
    if (!imageEmpty()) {
      addImages()
      clearCurrImages()
    }
    if (readyToGenerate()) {
      addResponseText()
    }
  }

  /* BOTTOMINPUTBAR STATE */
  const [text, setText] = useState("")
  // const [tokenCount, setTokenCount] = useState(0)
  const { data, updateData, addImage, deleteImage } = useData()

  useEffect(() => {
    setText(data.currText)
  }, [data.currText])

  useEffect(() => {
    // Automatically adjust main_container based on the number of uploaded images
    const mainContainer = document.querySelector(".main_container")
    if (mainContainer) {
      mainContainer.style.height = `auto`
    }
  }, [data.currImages, text])

  const handleInputChange = (e) => {
    setText(e.target.value)
    updateData({ currText: e.target.value })
  }

  const handleDeleteImage = (index) => {
    deleteImage(index)
  }

  const handleImageSelect = (e) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      addImage(fileArray[fileArray.length - 1])
    }
  }

  return (
    <div className="bottom_bar_container">
      <div className="input_container">
        <div className="text_put_container">
          <textarea
            className="text_container_text"
            value={text}
            onChange={handleInputChange}
            placeholder="Start typing..."
          />
          <button
            className={styles.putruniconButton}
            onClick={handlePutButton}
            style={{ flex: "0.2" }}
          >
            <Image
              src="/put.svg"
              alt="Put"
              width={10}
              height={10}
              style={{ marginRight: "5px" }}
            />
            <span>Put</span>
          </button>
        </div>
        <div className="image_preview_container">
          {data.currImages.map((imageSrc, index) => (
            <div key={index} className="image_preview">
              <Image
                className="image_preview_img"
                src={imageSrc}
                alt={`Uploaded image ${index + 1}`}
                width={50}
                height={50}
                objectFit="cover"
              />
              <button
                onClick={() => handleDeleteImage(index)}
                className="delete_image_button"
              >
                <Image
                  src="/x-button.svg"
                  alt={`Delete image ${index + 1}`}
                  width={10}
                  height={10}
                />
              </button>
            </div>
          ))}
        </div>

        <div className="icon_container">
          <div className="tokens_remaining">{tokenCount}/12888</div>
          <div className="bottom_icon_positioning">
            <Image
              src="/camera.svg"
              alt="camera"
              className="icon"
              width={10}
              height={10}
            />
          </div>
          <div className="bottom_icon_positioning">
            <label htmlFor="imageInput">
              <Image
                src="/imageLibrary.svg"
                alt="upload image"
                className="icon"
                width={10}
                height={10}
              />
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageSelect}
            />
          </div>
          <div className="bottom_icon_positioning">
            <Image
              src="/microphone.svg"
              alt="microphone"
              className="icon"
              width={10}
              height={10}
            />
          </div>
        </div>
      </div>

      <div className="runButtonContainer">
        <button
          className={styles.putruniconButton}
          onClick={handleRunButton}
          style={{ width: "100%" }}
        >
          <Image
            src="/run.svg"
            alt="Run"
            width={10}
            height={10}
            style={{ marginRight: "7px" }}
          />
          <span>Run</span>
        </button>
      </div>
    </div>
  )
}
