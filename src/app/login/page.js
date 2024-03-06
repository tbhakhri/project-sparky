"use client";

import DropdownSettingsMenu from "../DropdownSettingsMenu";

export default function Login() {
  const handleParameterChange = (parameters) => {};
  return (
    <div>
      <p>LOGIN</p>
      <DropdownSettingsMenu onParameterChange={handleParameterChange} />
    </div>
  );
}
