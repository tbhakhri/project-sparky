import React, { useState } from "react";
import styles from "@/page.module.css";
import "./PutRunSettings.css";
import Image from "next/image";
import CompareRerun from "../CompareRerun/CompareRerun";

export default function PutRunSettings() {
  const [showCompareRerun, setShowCompareRerun] = useState(false);

  const toggleCompareRerun = () => {
    setShowCompareRerun(!showCompareRerun);
  };

  const handleParameterChange = (parameters) => {
    console.log("Parameters changed:", parameters);
  };

  return (
    <div className="bottombarButtonsContainer">
      <div className="bottombarButtonsTop">
        <button className={styles.iconButton} style={{ width: "65%" }}>
          <Image
            src="/put.svg"
            alt="Put"
            width={10}
            height={10}
            style={{ marginRight: "5px" }}
          />
          <span>Put</span>
        </button>
        <button
          className="bottombarSettingsButton"
          onClick={toggleCompareRerun}
        >
          <Image
            src="/setting-lines.svg"
            alt="Config Params"
            width={15}
            height={15}
          />
        </button>
      </div>

      {showCompareRerun && (
        <CompareRerun onParameterChange={handleParameterChange} />
      )}

      <button className={styles.iconButton} style={{ width: "100%" }}>
        <Image
          src="/run.svg"
          alt="Run"
          width={10}
          height={10}
          style={{ marginRight: "7px" }}
        />
        <span>Run</span>
      </button>
    </div>
  );
}
