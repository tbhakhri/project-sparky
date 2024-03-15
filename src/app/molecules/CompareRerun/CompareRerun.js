import React, { useState } from "react";
import styles from "@/page.module.css";
import Image from "next/image";
import { Kumbh_Sans } from "next/font/google";

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] });

export default function CompareRerun({ onParameterChange }) {
  const defaultK = 50;
  const defaultP = 1.0;
  const defaultTemp = 0.7;
  const minTopK = 1;
  const minTopP = 0.0;
  const minTemp = 0.0;
  const maxTopK = 100;
  const maxTopP = 1.0;
  const maxTemp = 2.0;

  const [topK, setTopK] = useState(defaultK);
  const [topP, setTopP] = useState(defaultP);
  const [temperature, setTemperature] = useState(defaultTemp);

  const handleTopKChange = (event) => {
    const value = parseInt(event.target.value);
    setTopK(value);
    onParameterChange({ topK: value, topP, temperature });
  };

  const handleTopPChange = (event) => {
    const value = parseFloat(event.target.value);
    setTopP(value);
    onParameterChange({ topK, topP: value, temperature });
  };

  const handleTemperatureChange = (event) => {
    const value = parseFloat(event.target.value);
    setTemperature(value);
    onParameterChange({ topK, topP, temperature: value });
  };

  return (
    <div className="compareRerunContainer" style={{position: 'absolute', bottom: '80px'}}>
      <div className={styles.container} style={{ width: "85%" }}>
        <div className={styles.buttonsContainer}>
          <button
            className={styles.comparererunIconButton}
            style={{ width: "40%" }}
          >
            <Image
              src="compare.svg"
              alt="Compare Icon"
              width={10}
              height={10}
              style={{ marginRight: "10px" }}
            />{" "}
            <div className={kumbh_sans.className}>Compare</div>
          </button>
          <button
            className={styles.comparererunIconButton}
            style={{ width: "40%" }}
          >
            <Image
              src="/rerun.svg"
              alt="Rerun Icon"
              width={10}
              height={10}
              style={{ marginRight: "10px" }}
            />{" "}
            <div className={kumbh_sans.className}>Rerun</div>
          </button>
        </div>
        <div className={styles.sliderContainer}>
          <label htmlFor="topK-slider">Top K:</label>
          <input
            id="topK-slider"
            type="range"
            className={styles.slider}
            min={minTopK}
            max={maxTopK}
            step={1}
            value={topK}
            onChange={handleTopKChange}
          />
          <div className={styles.values}>
            <label className="valueLabel">{topK.toFixed(1)}</label>
          </div>
        </div>

        <div className={styles.spacing}></div>

        <div className={styles.sliderContainer}>
          <label htmlFor="topP-slider">Top P: </label>
          <input
            id="topP-slider"
            type="range"
            className={styles.slider}
            min={minTopP}
            max={maxTopP}
            step={0.05}
            value={topP}
            onChange={handleTopPChange}
          />
          <div className={styles.values}>
            <label className="valueLabel">{topP.toFixed(1)}</label>
          </div>
        </div>

        <div className={styles.spacing}></div>

        <div className={styles.sliderContainer}>
          <label htmlFor="temperature-slider">Temperature: </label>
          <input
            id="temperature-slider"
            type="range"
            className={styles.slider}
            min={minTemp}
            max={maxTemp}
            step={0.05}
            value={temperature}
            onChange={handleTemperatureChange}
          />
          <div className={styles.values}>
            <label className="valueLabel">{temperature.toFixed(1)}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
