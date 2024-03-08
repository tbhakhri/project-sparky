import React, { useState } from "react";

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
    <div style={styles.container}>
    
      <div style={styles.sliderContainer}>
        <label htmlFor="topK-slider">Top K: {topK.toFixed(1)}</label>
        <input
          id="topK-slider"
          type="range"
          min={minTopK}
          max={maxTopK}
          step={0.5}
          value={topK}
          onChange={handleTopKChange}
        />
      </div>

      <div style={styles.sliderContainer}>
        <label htmlFor="topP-slider">Top P: {topP.toFixed(1)}</label>
        <input
          id="topP-slider"
          type="range"
          min={minTopP}
          max={maxTopP}
          step={0.5}
          value={topP}
          onChange={handleTopPChange}
        />
      </div>

      <div style={styles.sliderContainer}>
        <label htmlFor="temperature-slider">
          Temperature: {temperature.toFixed(1)}
        </label>
        <input
          id="temperature-slider"
          type="range"
          min={minTemp}
          max={maxTemp}
          step={0.5}
          value={temperature}
          onChange={handleTemperatureChange}
        />
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    backgroundColor: "#fff",
    borderRadius: "5px",
    boxShadow: "0px 2px 4px rgba(0,0,0,0.25)",
  },
  sliderContainer: {
    margin: "10px 0",
  },
};

export default DropdownSettingsMenu;
