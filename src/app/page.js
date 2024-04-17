"use client"

import AuthContext from "%/authContext"
import { useData } from "%/DataContext"
import styles from "@/page.module.css"
import { useContext, useState, useRef, useCallback, useEffect } from "react"
import { redirect } from "next/navigation"
import CompareRerun from "@/molecules/CompareRerun/CompareRerun";
import TopBar from "@/organisms/TopBar/TopBar"
import MainContent from "@/organisms/MainContent/MainContent"
import BottomBar from "@/organisms/BottomBar/BottomBar"
import Webcam from "react-webcam"
import { DataProvider } from "@/molecules/DataContext/DataContext";
import SideBar from "@/molecules/SideBar/SideBar";

export default function App() {
  const { user, authReady } = useContext(AuthContext);
  const [isSidebar, setIsSidebar] = useState(false);
  const [showCompareRerun, setShowCompareRerun] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebar(!isSidebar);
  };

  const toggleCompareRerun = () => {
    setShowCompareRerun(!showCompareRerun);
  };

  let { apiKey } = useData()

  // TODO: IF APIKEY IS EMPTY STRING, FIRST TRY TO RETREIVE IT FROM DB
  if (apiKey === "") {
    // ...try to get apiKey from db
    // if successful, setApiKey
    // but for now, we will hardcode the apiKey to be always non-empty
    // apiKey = "testkey"
  }

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
    responses: [],
  }));

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
          {user !== null ? (
            apiKey !== "" ? (
              <>
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
                   <DataProvider>
                  {isSidebar && <SideBar toggleSidebar={toggleSidebar} />}
                  <TopBar toggleSidebar={toggleSidebar} />
                  <MainContent />
                  {showCompareRerun && (
                    <CompareRerun onParameterChange={handleParameterChange} />
                  )}
                 
                  <BottomBar
                    showCompareRerun={showCompareRerun}
                    toggleCompareRerun={toggleCompareRerun}
                    openCameraFunc={() => setIsCameraOpen(true)}
                    cameraImage={cameraImage}
                  />
                </DataProvider>
                </div>
              </>
            ) : (
              redirect("/apikey")
            )
          ) : (
            redirect("/login")
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}

