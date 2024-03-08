import React, { useState } from "react";
import styles from "../page.module.css";

const DropdownSettingsMenu = ({ onParameterChange }) => {
  const defaultK = 0;
  const defaultP = 0;
  const defaultTemp = 0;
  const minTopK = 0;
  const minTopP = 0;
  const minTemp = 0;
  const maxTopK = 10;
  const maxTopP = 10;
  const maxTemp = 10;

  const [topK, setTopK] = useState(defaultK);
  const [topP, setTopP] = useState(defaultP);
  const [temperature, setTemperature] = useState(defaultTemp);

  const handleTopKChange = (event) => {
    const value = parseFloat(event.target.value);
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
    <div className={styles.container}>
      <div className={styles.sliderContainer}>
        <label htmlFor="topK-slider">Top K:</label>
        <input
          id="topK-slider"
          type="range"
          className={styles.slider}
          min={minTopK}
          max={maxTopK}
          step={0.5}
          value={topK}
          onChange={handleTopKChange}
        />
        <label className="valueLabel">{topK.toFixed(1)}</label>
      </div>

      <div className={styles.sliderContainer}>
        <label htmlFor="topP-slider">Top P: </label>
        <input
          id="topP-slider"
          type="range"
          className={styles.slider}
          min={minTopP}
          max={maxTopP}
          step={0.5}
          value={topP}
          onChange={handleTopPChange}
        />
        <label className="valueLabel">{topP.toFixed(1)}</label>
      </div>

      <div className={styles.sliderContainer}>
        <label htmlFor="temperature-slider">Temperature: </label>
        <input
          id="temperature-slider"
          type="range"
          className={styles.slider}
          min={minTemp}
          max={maxTemp}
          step={0.5}
          value={temperature}
          onChange={handleTemperatureChange}
        />
        <label className="valueLabel">{temperature.toFixed(1)}</label>
      </div>
    </div>
  );
};

export default DropdownSettingsMenu;
