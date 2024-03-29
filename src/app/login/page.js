"use client"

import { useContext, useEffect } from "react"
import AuthContext from "%/authContext"
import GoogleSignInButton from "./logo"
import "./page.css"
import styles from "@/page.module.css"
import { redirect } from "next/navigation"
import Image from "next/image"

export default function Login() {
  const { user, login, authReady } = useContext(AuthContext)

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

  return (
    <div className={styles.pageContainer}>
      {authReady ? (
        <div>
          {user === null ? (
            <div className="outerContainer">
              <Image
                src="/sparkyLogo.svg"
                alt="sparky logo"
                width={230}
                height={100}
                style={{ paddingBottom: "30px" }}
              />
              <GoogleSignInButton onClick={() => login()} />
            </div>
          ) : (
            redirect("/")
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  )
}
