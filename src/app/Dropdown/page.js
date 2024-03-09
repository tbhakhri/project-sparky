"use client";


import DropdownSettingsMenu from "./DropdownSettingsMenu";
import FigmaDropdown from "./FigmaDropdown";
import DropdownFigma from "./FigmaDropdown";

export default function Dropdown() {
  const handleParameterChange = (parameters) => {};
  return (
    <div>
      <h1>Dropdown Menu Bar</h1>
      <DropdownSettingsMenu onParameterChange={handleParameterChange}/>
      
    </div>
  );
}
