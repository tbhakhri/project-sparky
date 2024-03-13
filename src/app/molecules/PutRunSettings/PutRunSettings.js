import React, { useState } from "react";
import styles from "@/page.module.css";
import "./PutRunSettings.css";
import Image from "next/image";
import Dropdown from "../Dropdown/Dropdown";

export default function PutRunSettings() {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
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
        <button className="bottombarSettingsButton" onClick={toggleDropdown}>
          <Image
            src="/setting-lines.svg"
            alt="Config Params"
            width={15}
            height={15}
          />
        </button>
      </div>

      {showDropdown && <Dropdown />}

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
