import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  class chatBubble {
    constructor(type, text, index) {
      this.type = type;
      this.text = text;
      this.index = index;
    }
  }

  const [data, setData] = useState({ chatBubbles: [], currText: "" });
  const [userIndex, setUserIndex] = useState(0);
  const [modelIndex, setModelIndex] = useState(0);

  const addUserText = () => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [
        ...prevData.chatBubbles,
        new chatBubble(
          "user", 
          prevData.currText, 
          userIndex
        ),
      ],
      currText: "",
    }));
    setUserIndex(userIndex + 1);
  };

  const addResponseText = () => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [
        ...prevData.chatBubbles,
        new chatBubble(
          "response",
          "This is a DUMMY RESPONSE to the user's message!!",
          modelIndex
        ),
      ],
    }));
    setModelIndex(modelIndex + 1);
  };

  const isEmpty = () => {
    if (data.currText != "") {
      return false;
    } else {
      return true;
    }
  };

  const clearCurrText = () => {
    updateData({ currText: "" });
  };

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  return (
    <DataContext.Provider
      value={{
        data,
        addUserText,
        addResponseText,
        clearCurrText,
        updateData,
        isEmpty,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
