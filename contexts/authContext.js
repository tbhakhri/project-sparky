"use client"

import { createContext, useState, useEffect } from 'react'

const AuthContext = createContext({
    user: null,
    login: async () => {},
    logout: async () => {},
    // boolean is true when connection to firebase is established
    authReady: false,
})

export const AuthContextProvider = ({ children }) => {
    const [user, setUser] = useState(1) // TODO: REPLACE WITH NULL ONCE AUTH CONTEXT IS PROPERLY IMPLEMENTED
    const [authReady, setAuthReady] = useState(false)

    const login = async (email, password) => {
        try {
        //   await auth.signInWithEmailAndPassword(email, password)
        } catch (error) {
          console.error("Login failed:", error)
        }
      };
    
    const logout = async () => {
    // await auth.signOut()
    };

    useEffect(() => {
        // const unsubscribe = auth.onAuthStateChanged((user) => {
        //   setUser(user)
        //   setAuthReady(true) // Set authReady to true once we get the initial user value
        // });
    
        // // Cleanup subscription on unmount
        // return () => unsubscribe()
      }, [])

    const context = {
        user,
        login,
        logout,
        authReady
    }

    return (
        <AuthContext.Provider value={context}>
            { children }
        </AuthContext.Provider>
    )
}

export default AuthContext