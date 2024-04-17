"use client"

import { useContext, useEffect } from "react"
import AuthContext from "%/authContext"
import { useData } from "%/DataContext"
import "./page.css"
import styles from "@/page.module.css"
import Image from "next/image"
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
      <Image src="/sparkyLogo.svg" alt="sparky logo" width={115} height={50} />
      <div className="instructions-container">
        <div className="instructions">
          Step 1:{" "}
          <a href="https://aistudio.google.com/app/apikey" target="_blank">
            Get API key (Desktop only)
          </a>
        </div>
        <div className="instructions">
          Step 2: Transfer key to your mobile phone
        </div>
        <div className="instructions">
          Step 3: From your phone, paste the key below
        </div>
        <div className="instructions">
          Step 4: Click "Submit" and start experimenting!
        </div>
      </div>
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
