import "./BottomBar.css"
import styles from "@/page.module.css"
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import { useData } from "%/DataContext"
import AuthContext from "%/authContext"

export default function BottomBar() {
  const {
    text,
    setText,
    handleImageSelect,
    currentPrompt,
    pushUserText,
    pushImages,
    addResponse,
    setErrorMessage,
    clearResponses,
    updateVariantHistory
  } = useData()

  const { user } = useContext(AuthContext)

  // returns true if a put was successful, else returns false
  const handlePut = async (followByRun) => {
    if (
      currentPrompt.variants[currentPrompt.currentVariant].currentResponses
        .length !== 0
    ) {
      updateVariantHistory()
    }
    setQueuePut(followByRun === true ? "putAndRun" : "putOnly")
  }

  async function put(followByRun) {
    let didPut = false
    if (!isImagesEmpty()) {
      await pushImages(user.uid, images)
      didPut = true
    }
    if (!isTextEmpty()) {
      await pushUserText(text)
      didPut = true
    }
    clearInputs()

    if (followByRun === "putAndRun") {
      if (didPut || !isInputEmpty()) {
        setQueueRun(true)
      } else {
        setErrorMessage("No inputs to run.")
      }
    }
  }
  const [queuePut, setQueuePut] = useState("")
  useEffect(() => {
    if (queuePut !== "") {
      put(queuePut)
      setQueuePut("")
    }
  }, [queuePut])

  const handleRun = async (_) => {
    await handlePut(true)
  }
  const [queueRun, setQueueRun] = useState(false)
  useEffect(() => {
    const run = async () => {
      try {
        await addResponse(currentPrompt.currentVariant)
      } catch (error) {
        console.error(error)
      }
    }
    if (queueRun) {
      clearResponses()
      run()
      setQueueRun(false)
    }
  }, [queueRun])

  const isInputEmpty = () => {
    return (
      currentPrompt.variants[currentPrompt.currentVariant].currentRequests
        .length === 0
    )
  }

  /* BOTTOMINPUTBAR STATE */
  /*const [text, setText] = useState("")*/
  const [images, setImages] = useState([])

  const isTextEmpty = () => {
    return text.length === 0
  }
  const isImagesEmpty = () => {
    return images.length === 0
  }

  useEffect(() => {
    // Automatically adjust main_container based on the number of uploaded images
    const mainContainer = document.querySelector(".main_container")
    if (mainContainer) {
      mainContainer.style.height = `auto`
    }
  }, [images, text])

  const clearInputs = () => {
    setText("")
    document.querySelector(".text_container_text").value = ""
    setImages([])
  }

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  /*const handleImageSelect = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const latestFile = files[files.length - 1]
      setImages((prev) => [...prev, latestFile])
    }
  }*/

  const handleDeleteImage = (index) => {
    setImages((prev) => prev.filter((_, currIndex) => currIndex !== index))
  }

  return (
    <div className="bottom_bar_container">
      <div className="input_container">
        <div className="text_put_container">
          <textarea
            className="text_container_text"
            onBlur={handleInputChange}
            placeholder="Start typing..."
          />
          <button
            className={styles.putruniconButton}
            onClick={handlePut}
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
          {images.map((imageFile, index) => (
            <div key={index} className="image_preview">
              <Image
                className="image_preview_img"
                src={URL.createObjectURL(imageFile)}
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
          onClick={handleRun}
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
