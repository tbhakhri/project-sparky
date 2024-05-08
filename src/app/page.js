"use client"

import AuthContext from "%/authContext"
import { useData } from "%/DataContext"
import styles from "@/page.module.css"
import { useContext, useState, useEffect } from "react"
import { redirect, useRouter } from "next/navigation"
import TopBar from "@/organisms/TopBar/TopBar"
import MainContent from "@/organisms/MainContent/MainContent"
import BottomBar from "@/organisms/BottomBar/BottomBar"
import SideBar from "@/molecules/SideBar/SideBar"
import { VoiceRecorder } from "react-voice-recorder-player"

export default function App() {
  const router = useRouter()
  const { user, authReady } = useContext(AuthContext)
  const [isSidebar, setIsSidebar] = useState(false)

  const toggleSidebar = () => {
    setIsSidebar(!isSidebar)
  }

  const [isVoiceRecordingOpen, setIsVoiceRecordingOpen] = useState(false)
  const voiceRecorderStyles = {
    mainContainerStyle: {
      margin: "0",
      width: "100%",
      padding: "0px 10px",
      boxShadow: "none"
    }
  }

  const [blob, setBlob] = useState(null)
  function handleVoiceRecording(blob) {
    setBlob(blob)
  }

  const {
    currentPrompt,
    apiKey,
    setApiKey,
    promptTitles,
    setPromptTitles,
    queueSave,
    setQueueSave
  } = useData()

  /* SETTING PROPER SCREEN HEIGHT FOR MOBILE DEVICES */
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

  async function savePrompt() {
    try {
      let response = await fetch("/api/storePromptTitle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: user.uid,
          promptTitle: currentPrompt.promptTitle,
          promptID: currentPrompt.promptID
        })
      })

      if (!response.ok) {
        console.error("Failed to store promptTitle.")
      }

      response = await fetch("/api/storePromptData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          variants: currentPrompt.variants,
          promptID: currentPrompt.promptID,
          hasGeneratedName: currentPrompt.hasGeneratedName
        })
      })

      if (!response.ok) {
        console.error("Failed to store promptData.")
      }

      const updatedPromptTitles = promptTitles.map((item) => {
        if (item.promptID === currentPrompt.promptID) {
          return { ...item, promptTitle: currentPrompt.promptTitle }
        }
        return item
      })
      setPromptTitles(updatedPromptTitles)
    } catch (error) {
      console.error("Error saving prompt:", error)
    }
  }

  useEffect(() => {
    async function fetchKeyAndPromptTitles() {
      if (user && apiKey === "") {
        let url = new URL("/api/getApiKey", window.location.origin)
        url.searchParams.append("userID", user.uid)
        let response = await fetch(url.toString(), {
          method: "GET"
        })
        if (response.status === 404) {
          router.push("/apikey")
        } else {
          const data = await response.json()
          setApiKey(data.apiKey)
        }

        url = new URL("/api/getPromptTitles", window.location.origin)
        url.searchParams.append("userID", user.uid)
        response = await fetch(url.toString(), {
          method: "GET"
        })
        const data = await response.json()
        setPromptTitles(data)
      }
    }
    fetchKeyAndPromptTitles()
  }, [user, apiKey])

  useEffect(() => {
    if (queueSave) {
      savePrompt()
      setQueueSave(false)
    }
  }, [queueSave])

  return (
    <div className={styles.pageContainer}>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0, maximum-scale=1, user-scalable=no, viewport-fit=cover"
      />
      {authReady ? (
        <>
          {user !== null ? (
            <>
              {apiKey !== "" ? (
                <div className={styles.pageContainer}>
                  {isSidebar && (
                    <SideBar
                      toggleSidebar={toggleSidebar}
                      savePrompt={savePrompt}
                    />
                  )}
                  <TopBar toggleSidebar={toggleSidebar} />
                  {isVoiceRecordingOpen && (
                    <div
                      style={{
                        width: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}
                    >
                      <VoiceRecorder
                        mainContainerStyle={
                          voiceRecorderStyles.mainContainerStyle
                        }
                        downloadable={false}
                        onAudioDownload={handleVoiceRecording}
                      />
                      <button
                        onClick={() => setIsVoiceRecordingOpen(false)}
                        className={styles.putruniconButton}
                        style={{
                          width: "70px",
                          marginTop: "15px",
                          cursor: "pointer",
                          fontSize: "0.8rem"
                        }}
                      >
                        Close
                      </button>
                    </div>
                  )}
                  <MainContent />
                  <BottomBar
                    openVoiceRecorder={() => setIsVoiceRecordingOpen(true)}
                    blob={blob}
                    setBlob={setBlob}
                    closeVoiceRecorder={() => setIsVoiceRecordingOpen(false)}
                  />
                </div>
              ) : (
                <div>Loading...</div>
              )}
            </>
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
