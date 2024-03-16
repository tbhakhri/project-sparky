"use client"

import AuthContext from "%/authContext"
import styles from "@/page.module.css"
import { useContext, useState } from "react"
import { redirect } from "next/navigation"
import TopBar from "@/organisms/TopBar/TopBar"
import MainContent from "@/organisms/MainContent/MainContent"
import BottomBar from "@/organisms/BottomBar/BottomBar"
import { DataProvider } from "%/DataContext"

export default function App() {
  const { user, authReady } = useContext(AuthContext)

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

  return (
    <div className={styles.pageContainer}>
      {authReady ? (
        <>
          {user === null ? (
            redirect("/login")
          ) : (
            <>
              <>
                <DataProvider>
                  <TopBar />
                  <MainContent />
                  <BottomBar />
                </DataProvider>
              </>
            </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
