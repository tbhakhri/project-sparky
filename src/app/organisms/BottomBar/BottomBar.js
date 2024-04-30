import "./BottomBar.css"
import styles from "@/page.module.css"
import Image from "next/image"
import { useState, useEffect, useContext } from "react"
import { useData } from "%/DataContext"
import AuthContext from "%/authContext"
import { determineFileType } from "%/utils"

export default function BottomBar({
  openVoiceRecorder,
  blob,
  setBlob,
  closeVoiceRecorder
}) {
  const {
    currentPrompt,
    pushUserText,
    pushFiles,
    addResponse,
    setErrorMessage,
    clearResponses,
    updateVariantHistory
  } = useData()

  const { user } = useContext(AuthContext)

  const handlePut = async (followByRun) => {
    if (
      currentPrompt.variants[currentPrompt.currentVariant].currentResponses
        .length !== 0
    ) {
      updateVariantHistory()
    }
    setQueuePut(followByRun === true ? "putAndRun" : "putOnly")
  }

  // returns true if a put was successful, else returns false
  async function put(followByRun) {
    let didPut = false
    if (!isImagesEmpty()) {
      await pushFiles(user.uid, files)
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
  const [text, setText] = useState("")
  const [files, setFiles] = useState([])
  console.log("files", files)

  const isTextEmpty = () => {
    return text.length === 0
  }
  const isImagesEmpty = () => {
    return files.length === 0
  }

  useEffect(() => {
    // Automatically adjust main_container based on the number of uploaded images
    const mainContainer = document.querySelector(".main_container")
    if (mainContainer) {
      mainContainer.style.height = `auto`
    }
  }, [files, text])

  const clearInputs = () => {
    setText("")
    document.querySelector(".text_container_text").value = ""
    setFiles([])
  }

  const handleInputChange = (e) => {
    setText(e.target.value)
  }

  const handleFileSelect = (e) => {
    const files = e.target.files
    if (files && files.length > 0) {
      const latestFile = files[files.length - 1]
      const fileType = determineFileType(latestFile.type)
      if (fileType === "unknown") {
        setErrorMessage(
          "File Type is not allowed. Note that for audio inputs you cannot upload video"
        )
      } else {
        setFiles((prev) => [...prev, [fileType, latestFile]])
      }
    }
  }

  const handleDeleteFile = (index) => {
    setFiles((prev) => prev.filter((_, currIndex) => currIndex !== index))
  }

  useEffect(() => {
    if (blob !== null) {
      setFiles((prev) => [...prev, ["audio", blob]])
      setBlob(null)
      closeVoiceRecorder()
    }
  }, [blob])

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
            className={styles.puticonButton}
            onClick={handlePut}
            style={{ flex: "0.2" }}
          >
            <Image
              src="/put.svg"
              alt="Put"
              width={12}
              height={12}
              style={{ marginRight: "5px" }}
            />
            <span>Put</span>
          </button>
        </div>
        <div className="file_preview_container">
          {files.map(([fileType, file], index) => (
            <div key={index} className="file_preview">
              <Image
                src={
                  fileType === "image"
                    ? URL.createObjectURL(file)
                    : "/audio-waves.svg"
                }
                alt={`Uploaded file ${index + 1}`}
                width={50}
                height={50}
                objectFit="cover"
              />
              <button
                onClick={() => handleDeleteFile(index)}
                className="delete_file_button"
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
                width={15}
                height={15}
              />
            </label>
            <input
              type="file"
              id="imageInput"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </div>
          <div className="bottom_icon_positioning">
            <button
              onClick={openVoiceRecorder}
              style={{
                border: "none",
                cursor: "pointer",
                background: "transparent"
              }}
            >
              <Image
                src="/microphone.svg"
                alt="microphone"
                className="icon"
                width={15}
                height={15}
              />
            </button>
          </div>
        </div>
      </div>
        <div className="runButtonContainer"> 
          <button
            className={styles.runiconButton}
            onClick={handleRun}
            style={{ width: "100%" }}
          >
          <div className="runSparkyLogo">
            <Image
            src="/run.svg"
            alt="Run"
            width={15}
            height={15}
          />
          </div>
          <div className="runText">Run</div>
        </button>
        </div>
    </div>
  )
}
