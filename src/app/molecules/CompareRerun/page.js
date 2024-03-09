"use client";

import DropdownSettingsMenu from "./CompareRerun";

export default function Dropdown() {
  const handleParameterChange = (parameters) => {};
  return (
    <div>
      <h1>Dropdown Menu Bar</h1>
      <DropdownSettingsMenu onParameterChange={handleParameterChange}/>
      
    </div>
  );
}
