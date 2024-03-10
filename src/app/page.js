"use client"

import AuthContext from "../../contexts/authContext"; 
import styles from "@/page.module.css";
import { useContext } from "react";
import { redirect } from "next/navigation";
import CompareRerun from "@/molecules/CompareRerun/CompareRerun";
import PutRunSettings from "@/molecules/PutRunSettings/PutRunSettings";
import BottomInputBox from "@/molecules/BottomInputBox/BottomInputBox";

export default function App() {
  const { user, logout, authReady } = useContext(AuthContext)
  return (
      <>
      {
        authReady ? <>
        {user === null ? redirect('/login') : (
          <>
            <main className={styles.main}>
              MAIN PAGE
              <CompareRerun onParameterChange={() => {}}></CompareRerun>
              <BottomInputBox />
              <PutRunSettings />
            </main>
            <button onClick={() => logout()}>Logout</button>
          </>
        )}
        </> : <div>
          Loading...
        </div>
      }
      </>
  )
}
