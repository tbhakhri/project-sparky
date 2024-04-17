"use client"

import { useContext, useEffect } from "react"
import AuthContext from "%/authContext"
import { useData } from "%/DataContext"
import "./page.css"
import styles from "@/page.module.css"
import { redirect, useRouter } from "next/navigation"

export default function Enter_API_Key() {
  const router = useRouter()
  const { user, authReady } = useContext(AuthContext)
  const { setApiKey } = useData()

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

  function handleSubmit(e) {
    e.preventDefault()
    setApiKey(e.target.elements.apiKeyInput.value)
    router.push("/")
  }

  return (
    <div className={styles.pageContainer}>
      {authReady ? (
        <div>
          {user !== null ? (
            <div className="outerContainer">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="apiKeyInput"
                  placeholder="Enter API Key"
                />
                <button type="submit">Submit</button>
              </form>
            </div>
          ) : (
            redirect("/login")
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
