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

  const [data, setData] = useState({
    chatBubbles: [],
    currText: "",
    currImages: [],
    readyToGenerate: false,
  });

  const addUserText = () => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [
        ...prevData.chatBubbles,
        new chatBubble("user", prevData.currText),
      ],
      currText: "",
    }));

    setData((prevData) => ({
      ...prevData,
      readyToGenerate: true,
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

    setData((prevData) => ({
      ...prevData,
      readyToGenerate: false,
    }));
  };

  const addImage = (src) => {
    setData((prevData) => ({
      ...prevData,
      currImages: [...prevData.currImages, src],
    }));
  };

  const addImages = () => {
    for (let i = 0, len = data.currImages.length; i < len; i++) {
      setData((prevData) => ({
        ...prevData,
        chatBubbles: [
          ...prevData.chatBubbles,
          new chatBubble("image", data.currImages[i]),
        ],
      }));
    }

    setData((prevData) => ({
      ...prevData,
      readyToGenerate: true,
    }));
  };

  const textEmpty = () => {
    if (data.currText == "") {
      return true;
    } else {
      return false;
    }
  };

  const imageEmpty = () => {
    if (data.currImages.length == 0) {
      return true;
    } else {
      return false;
    }
  };

  const clearCurrText = () => {
    updateData({ currText: "" });
  };

  const clearCurrImages = () => {
    updateData({ currImages: [] });
  };

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const readyToGenerate = () => {
    return data.readyToGenerate;
  };

  return (
    <DataContext.Provider
      value={{
        data,
        addUserText,
        addResponseText,
        clearCurrText,
        updateData,
        imageEmpty,
        textEmpty,
        addImage,
        addImages,
        clearCurrImages,
        readyToGenerate,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
