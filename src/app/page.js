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

export default function App() {
  const router = useRouter()
  const { user, authReady } = useContext(AuthContext)
  const [isSidebar, setIsSidebar] = useState(false)

  const toggleSidebar = () => {
    setIsSidebar(!isSidebar)
  }

  const {
    currentPrompt,
    apiKey,
    setApiKey,
    promptNames,
    setPromptNames,
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
    console.log("calling savePrompt")
    try {
      let response = await fetch("/api/storePromptName", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          userID: user.uid,
          promptName: currentPrompt.promptName,
          promptID: currentPrompt.promptID
        })
      })

      if (!response.ok) {
        console.error("Failed to store promptName.")
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

      const updatedPromptNames = promptNames.map((item) => {
        if (item.promptID === currentPrompt.promptID) {
          return { ...item, promptName: currentPrompt.promptName }
        }
        return item
      })
      setPromptNames(updatedPromptNames)
    } catch (error) {
      console.error("Error saving prompt:", error)
    }
  }

  useEffect(() => {
    async function fetchKeyAndPromptNames() {
      if (user && apiKey === "") {
        let url = new URL("/api/getApiKey", window.location.origin)
        url.searchParams.append("userID", user.uid)
        let response = await fetch(url.toString(), {
          method: "GET"
        })
        if (response.status === 404) {
          console.log("No key found for user", user.uid)
          router.push("/apikey")
        } else {
          const data = await response.json()
          console.log("Key found for user", user.uid)
          setApiKey(data.apiKey)
        }

        url = new URL("/api/getPromptNames", window.location.origin)
        url.searchParams.append("userID", user.uid)
        response = await fetch(url.toString(), {
          method: "GET"
        })
        const data = await response.json()
        setPromptNames(data)
      }
    }
    fetchKeyAndPromptNames()
  }, [user, apiKey])

  useEffect(() => {
    if (queueSave) {
      console.log("QueueSave is true")
      savePrompt()
      setQueueSave(false)
    }
  }, [queueSave])

  return (
    <div className={styles.pageContainer}>
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
                  <MainContent />
                  <BottomBar />
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
