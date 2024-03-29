"use client"

import AuthContext from "%/authContext"
import styles from "@/page.module.css"
import { useContext, useState, useRef, useCallback, useEffect } from "react"
import { redirect } from "next/navigation"
import TopBar from "@/organisms/TopBar/TopBar"
import MainContent from "@/organisms/MainContent/MainContent"
import BottomBar from "@/organisms/BottomBar/BottomBar"
import { DataProvider } from "%/DataContext"

import Webcam from "react-webcam"

export default function App() {
  const { user, authReady } = useContext(AuthContext)
  const setHeight = () => {
    let vh = window.innerHeight * 0.01
    document.documentElement.style.setProperty("--vh", `${vh}px`)
  }

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      window.addEventListener("resize", setHeight)
      setHeight()
    }
  }, [])

  const [promptMetadata, setPromptMetadata] = useState(() => ({
    id: generateUUID(),
    name: "My Prompt",
    lastModified: new Date(),
    requestChain: [],
    responses: []
  }))

  const tokenCount = calculateTokenCount(promptMetadata.requestChain)
  const maxTokenCount = 1048576

  function generateUUID() {
    const buffer = crypto.getRandomValues(new Uint8Array(4))
    return buffer.toString("base64").replace(/,/g, "")
  }

  function calculateTokenCount(requestChain) {
    // TODO: REPLACE WITH WORKING IMPLEMENTATION
    return 1000
  }

  /* CAMERA */
  const webcamRef = useRef(null)
  const [isCameraOpen, setIsCameraOpen] = useState(false)
  const [cameraImage, setCameraImage] = useState(null)
  const capture = useCallback(() => {
    setCameraImage(webcamRef.current.getScreenshot())
    setIsCameraOpen(false)
  }, [webcamRef])

  return (
    <div className={styles.pageContainer}>
      {authReady ? (
        <>
          {user === null ? (
            redirect("/login")
          ) : (
            <>
              <DataProvider>
                {isCameraOpen && (
                  <>
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      width={"100%"}
                      screenshotFormat="image/jpeg"
                    />
                    <button onClick={capture}>Capture</button>
                  </>
                )}
                <div
                  className={styles.pageContainer}
                  style={{
                    display: isCameraOpen ? "none" : "flex"
                  }}
                >
                  <TopBar />
                  <MainContent />
                  <BottomBar
                    openCameraFunc={() => setIsCameraOpen(true)}
                    cameraImage={cameraImage}
                  />
                </div>
              </DataProvider>
            </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
