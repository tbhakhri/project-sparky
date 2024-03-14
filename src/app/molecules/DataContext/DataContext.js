import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({ texts: [], currText: "" });

  const addText = () => {
    setData((prevData) => ({
      ...prevData,
      texts: [...prevData.texts, prevData.currText],
      currText: "",
    }));
  };

  const clearCurrText = () => {
    updateData({ currText: "" });
  };

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <DataContext.Provider value={{ data, addText, clearCurrText, updateData }}>
      {children}
    </DataContext.Provider>
  );
};
