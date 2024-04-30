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

  const goToHome = () => {
    router.push('/');
  }

  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) {
      window.addEventListener("resize", setHeight)
      setHeight()
    }
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const apiKey = e.target.elements.apiKeyInput.value

    try {
      const response = await fetch("/api/storeApiKey", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ userID: user.uid, apiKey })
      })

      if (!response.ok) {
        console.error("Failed to store API key.")
      } else {
        setApiKey(apiKey)
        router.push("/")
      }
    } catch (error) {
      console.error("Error storing API key:", error)
    }
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
      <button className="homeButton">
        <Image
            src="/home.svg"
            alt="homeKeyButton"
            width={20}
            height={20}
            onClick={goToHome}
          />
      </button>
      {authReady ? (
        <div>
          {user !== null ? (
            <div className="outerContainer">
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="apiKeyInput"
                  placeholder="Enter API Key"
                  autoComplete="off"
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
