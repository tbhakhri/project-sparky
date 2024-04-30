"use client"

import { createContext, useState, useEffect } from "react"
import { auth, provider } from "./config"
import { signInWithPopup } from "firebase/auth"

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: async () => {},
  // boolean is true when connection to firebase is established
  authReady: false
})

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authReady, setAuthReady] = useState(false)

  const login = async () => {
    try {
      await signInWithPopup(auth, provider)
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const logout = async () => {
    await auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user)
      setAuthReady(true)
    })

    // Cleanup subscription on unmount
    return () => unsubscribe()
  }, [])

  const context = {
    user,
    login,
    logout,
    authReady
  }

  return <AuthContext.Provider value={context}>{children}</AuthContext.Provider>
}

export default AuthContext
