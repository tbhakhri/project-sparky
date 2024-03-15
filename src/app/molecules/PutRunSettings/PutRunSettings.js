import React, { useState } from "react";
import styles from "@/page.module.css";
import "./PutRunSettings.css";
import Image from "next/image";
import { data, useData } from "@/molecules/DataContext/DataContext";

export default function PutRunSettings({
  showCompareRerun,
  toggleCompareRerun,
}) {
  const { isEmpty, addUserText, addResponseText, clearCurrText } = useData();

  const handleInputChange = (e) => {
    if (!isEmpty()) {
      addUserText();
      clearCurrText();
    }
  };

  const handleRunButton = (e) => {
    if (!isEmpty()) {
      addUserText();
      clearCurrText();
    }
    addResponseText();
  };

  return (
    <div className="bottombarButtonsContainer">
      <div className="bottombarButtonsTop">
        <button
          className={styles.putruniconButton}
          onClick={handleInputChange}
          style={{ width: "65%" }}
        >
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

      <button
        className={styles.putruniconButton}
        onClick={handleRunButton}
        style={{ width: "100%" }}
      >
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
