"use client";

import CompareButton from "./compareButton";
import DropdownSettingsMenu from "./DropdownSettingsMenu";
import FigmaDropdown from "./FigmaDropdown";
import DropdownFigma from "./FigmaDropdown";

export default function Dropdown() {
  const handleParameterChange = (parameters) => {};
  return (
    <div>
      <h1>DROPDOWN MENU BAR</h1>
      <h2>HI</h2>
      
      {/* <FigmaDropdown /> */}
      <DropdownSettingsMenu onParameterChange={handleParameterChange}/>
      
    </div>
  );
}
