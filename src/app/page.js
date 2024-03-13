"use client"

import AuthContext from "../../contexts/authContext"; 
import styles from "@/page.module.css";
import { useContext, useState } from "react";
import { redirect } from "next/navigation";
import CompareRerun from "@/molecules/CompareRerun/CompareRerun";
import PutRunSettings from "@/molecules/PutRunSettings/PutRunSettings";
import BottomInputBox from "@/molecules/BottomInputBox/BottomInputBox";
import TopBar from "@/molecules/TopBar/TopBar";
import MainContent from "@/molecules/MainContent/MainContent";
import BottomBar from "@/molecules/BottomBar/BottomBar";


export default function App() {
  const { user, logout, authReady } = useContext(AuthContext)
  
  const [promptMetadata, setPromptMetadata] = useState(() => ({
    id: generateUUID(),
    name: 'My Prompt',
    lastModified: new Date(),
    requestChain: [],
    responses: [],
  }));
  const [curModelSettings, setCurModelSettings] = useState({
    modelName: 'Gemini 1.0 Pro Vision',
    temperature: 0.4,
    topP: 1,
    topK: 32,
  })
  
  const tokenCount = calculateTokenCount(promptMetadata.requestChain)
  const maxTokenCount = calculateMaxTokenCount(curModelSettings.modelName)

  function generateUUID() {
    const buffer = crypto.getRandomValues(new Uint8Array(4))
    return buffer
      .toString('base64')
      .replace(/,/g, '')
  }  

  function calculateTokenCount(requestChain) {
    // TODO: REPLACE WITH WORKING IMPLEMENTATION
    return 1000
  }

  function calculateMaxTokenCount(modelName) {
    switch (modelName) {
      case 'Gemini 1.0 Pro':
        return 30720
      case 'Gemini 1.0 Pro Vision':
        return 12288
      default: return 10000
    }
  }

  return (

    <div className={styles.pageContainer}>
      {
        authReady ? <>
        {user === null ? redirect('/login') : (
          <>
            <>
              <TopBar />
              {/* TODO: MOVE THIS INTO THE TOP BAR MAYBE */}
              {/* <button onClick={() => logout()}>Logout</button> */}
              <MainContent requestChain={promptMetadata.requestChain} responses={promptMetadata.responses}/>
              <BottomBar />
            </>

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
