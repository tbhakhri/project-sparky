"use client"

import { useContext } from "react"
import AuthContext from "%/authContext"
import GoogleSignInButton from "./logo"
import "./page.css"
import styles from "@/page.module.css"
import { redirect } from "next/navigation"
import Image from "next/image"

export default function Login() {
  const { user, login, authReady } = useContext(AuthContext)

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
