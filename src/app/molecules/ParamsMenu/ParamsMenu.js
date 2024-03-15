import React, { useState } from "react";
import styles from "@/page.module.css";

export default function ParamsMenu({ onParameterChange }) {
  const minTopK = 1;
  const minTopP = 0.0;
  const minTemp = 0.0;
  const maxTopK = 100;
  const maxTopP = 1.0;
  const maxTemp = 1.0;

  const initialState = {
    topK: 1,
    topP: 1.0,
    temperature: 0.9,
    modelType: 'Gemini Pro Vision 1.0',
  };

  const [params, setParams] = useState(initialState);

  const handleParamsChange = (name, value) => {
    const newState = { ...params, [name]: value };
    setParams(newState);
    onParameterChange(newState);
  };

  return (
    <div className="paramsMenuContainer" style={{position: 'absolute', bottom: '80px'}}>
      <div className={styles.container} style={{ width: "85%" }}>
        
        <div className={styles.sliderContainer}>
          <label htmlFor="topP-slider">Model: </label>
          <select
            id="modelType-select"
            className={styles.modelName}
            value={params.option}
            onChange={(e) => handleParamsChange('modelType', e.target.value)}
          >
            <option value="Gemini Pro Vision 1.0">Gemini Pro Vision 1.0</option>
            <option value="Gemini Pro 1.5">Gemini Pro 1.5</option>
          </select>
        </div>

        <div className={styles.spacing}></div>

        <div className={styles.sliderContainer}>
          <label htmlFor="topK-slider">Top K:</label>
          <input
            id="topK-slider"
            type="range"
            className={styles.slider}
            min={minTopK}
            max={maxTopK}
            step={1}
            value={params.topK}
            onChange={(e) => handleParamsChange('topK', parseInt(e.target.value))}
          />
          <div className={styles.values}>
            <label className="valueLabel">{params.topK.toFixed(0)}</label>
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
            value={params.topP}
            onChange={(e) => handleParamsChange('topP', parseFloat(e.target.value))}
          />
          <div className={styles.values}>
            <label className="valueLabel">{params.topP.toFixed(1)}</label>
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
            value={params.temperature}
            onChange={(e) => handleParamsChange('temperature', parseFloat(e.target.value))}
          />
          <div className={styles.values}>
            <label className="valueLabel">{params.temperature.toFixed(1)}</label>
          </div>
        </div>
      </div>
    </div>
  );
}
