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

  let { apiKey, setApiKey } = useData()

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

  useEffect(() => {
    async function fetchKey() {
      if (user && apiKey === "") {
        const url = new URL("/api/getApiKey", window.location.origin)
        url.searchParams.append("username", user.uid)

        const response = await fetch(url.toString(), {
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
      }
    }
    fetchKey()
  }, [user, apiKey])

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
      {apiKey !== "" && authReady ? (
        <>
          {user !== null ? (
            <>
              <div className={styles.pageContainer}>
                {isSidebar && <SideBar toggleSidebar={toggleSidebar} />}
                <TopBar toggleSidebar={toggleSidebar} />
                <MainContent />
                <BottomBar />
              </div>
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
