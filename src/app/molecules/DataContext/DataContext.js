import React, { createContext, useState, useContext } from "react";

const DataContext = createContext();

export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  class chatBubble {
    constructor(type, text) {
      this.type = type;
      this.text = text;
    }
  }

  const [data, setData] = useState({ chatBubbles: [], currText: "" });

  const addUserText = () => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [
        ...prevData.chatBubbles,
        new chatBubble("user", prevData.currText),
      ],
      currText: "",
    }));
  };

  const addResponseText = () => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [
        ...prevData.chatBubbles,
        new chatBubble(
          "response",
          "This is a DUMMY RESPONSE to the user's message!!"
        ),
      ],
    }));
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
