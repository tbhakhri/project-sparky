"use client"

import AuthContext from "%/authContext"
import { useData } from "%/DataContext"
import styles from "@/page.module.css"
import { useContext, useState, useEffect } from "react"
import { redirect } from "next/navigation"
import TopBar from "@/organisms/TopBar/TopBar"
import MainContent from "@/organisms/MainContent/MainContent"
import BottomBar from "@/organisms/BottomBar/BottomBar"

export default function App() {
  const { user, authReady } = useContext(AuthContext)
  let { apiKey } = useData()

  // TODO: IF APIKEY IS EMPTY STRING, FIRST TRY TO RETREIVE IT FROM DB
  if (apiKey === "") {
    // ...try to get apiKey from db
    // if successful, setApiKey
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
    responses: []
  }))

  function generateUUID() {
    const buffer = crypto.getRandomValues(new Uint8Array(4))
    return buffer.toString("base64").replace(/,/g, "")
  }

  return (
    <div className={styles.pageContainer}>
      {authReady ? (
        <>
          {user !== null ? (
            apiKey !== "" ? (
              <div
                className={styles.pageContainer}
                style={{
                  display: "flex"
                }}
              >
                <TopBar />
                <MainContent />
                <BottomBar />
              </div>
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
