"use client";

import AuthContext from "../../contexts/authContext";
import styles from "@/page.module.css";
import { useContext, useState } from "react";
import { redirect } from "next/navigation";
// import CompareRerun from "@/molecules/CompareRerun/CompareRerun";
import TopBar from "@/organisms/TopBar/TopBar";
import MainContent from "@/organisms/MainContent/MainContent";
import BottomBar from "@/organisms/BottomBar/BottomBar";
import { DataProvider } from "@/molecules/DataContext/DataContext";
import ParamsMenu from "@/molecules/ParamsMenu/ParamsMenu";

export default function App() {
  const { user, authReady } = useContext(AuthContext)
  
  const [showParamsMenu, setShowParamsMenu] = useState(false);

  const toggleParamsMenu = () => {
    setShowParamsMenu(!showParamsMenu);
  };

  const handleParameterChange = (parameters) => {
    console.log("Parameters changed:", parameters);
  };

  const [promptMetadata, setPromptMetadata] = useState(() => ({
    id: generateUUID(),
    name: "My Prompt",
    lastModified: new Date(),
    requestChain: [],
    responses: [],
  }));
  const [curModelSettings, setCurModelSettings] = useState({
    modelName: "Gemini 1.0 Pro Vision",
    temperature: 0.4,
    topP: 1,
    topK: 32,
  });

  const tokenCount = calculateTokenCount(promptMetadata.requestChain);
  const maxTokenCount = calculateMaxTokenCount(curModelSettings.modelName);

  function generateUUID() {
    const buffer = crypto.getRandomValues(new Uint8Array(4));
    return buffer.toString("base64").replace(/,/g, "");
  }

  function calculateTokenCount(requestChain) {
    // TODO: REPLACE WITH WORKING IMPLEMENTATION
    return 1000;
  }

  function calculateMaxTokenCount(modelName) {
    switch (modelName) {
      case "Gemini 1.0 Pro":
        return 30720;
      case "Gemini 1.0 Pro Vision":
        return 12288;
      default:
        return 10000;
    }
  }

  return (
    <div className={styles.pageContainer}>
      {authReady ? (
        <>
          {user === null ? (
            redirect("/login")
          ) : (
            <>
              <>
                <DataProvider>
                  <TopBar />
                  <MainContent />
                  {showParamsMenu && (
                    <ParamsMenu onParameterChange={handleParameterChange} />
                    // <CompareRerun onParameterChange={handleParameterChange} />
                  )}
                  <BottomBar
                    toggleParamsMenu={toggleParamsMenu}
                  />

                </DataProvider>
              </>
            </>
          )}
        </>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}
