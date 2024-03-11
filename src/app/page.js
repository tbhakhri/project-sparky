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
    <div className={styles.pageContainer}>
      {
        authReady ? <>
        {user === null ? redirect('/login') : (
          <>
            <>
              MAIN PAGE
              <CompareRerun onParameterChange={() => {}}></CompareRerun>
              <BottomInputBox />
              <PutRunSettings />
            </>
            {/* TODO: MOVE THIS INTO THE TOP BAR MAYBE */}
            <button onClick={() => logout()}>Logout</button>
          </>
          /*
          Idea is that instead of:
          <>
            <>
              MAIN PAGE
              <CompareRerun onParameterChange={() => {}}></CompareRerun>
              <BottomInputBox />
              <PutRunSettings />
            </>
            <button onClick={() => logout()}>Logout</button>
          </>

          we'll have:

          <TopMenu>
          <MainContent> naming TBD
          <BottomMenu>

          CONSIDERATIONS:
          - How much space should TopMenu, MainContent, and BottomMenu each take up?
          - Depending on how/whether the text box in BottomMenu resizes as you type text in, will the height of the BottomMenu change? If so we need to thoroughly test it to make sure nothing looks wonky
          */
        )}
        </> : <div>
          Loading...
        </div>
      }
    </div>
  )
}
