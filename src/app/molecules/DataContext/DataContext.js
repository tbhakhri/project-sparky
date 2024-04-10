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

  const [prompts, setPrompts] = useState({
    promptData: [],
    promptTitles: [],
  });
  console.log(prompts)

  const [data, setData] = useState({
    //promptTitles: [],
    chatBubbles: [],
    currText: "",
    currImages: [],
    readyToGenerate: false,
    marked: false,
  });

  const [userIndex, setUserIndex] = useState(0);
  const [modelIndex, setModelIndex] = useState(0);

  // console.log(data.chatBubbles);

  // data.chatBubbles.forEach((bubble) => {
  //   console.log("hiiiiiii", bubble.text, bubble.type);
  // });

  const addPrompt = () => {
    setPrompts((prevPrompts) => ({
      ...prevPrompts,
      promptData: [...prevPrompts.promptData, { ...data }],
      promptTitles: [data.chatBubbles[0]?.text, ...prevPrompts.promptTitles],
    }));
   // console.log(data.promptTitles);

    setData({
      chatBubbles: [],
      currText: "",
      currImages: [],
      readyToGenerate: false,
      marked: false,
    });
  };

  const deletePrompt = (index) => {
    setPrompts((prevPrompts) => ({
      ...prevPrompts,
      promptData: prevPrompts.promptData.filter((_, currIndex) => currIndex !== index),
      promptTitles: prevPrompts.promptData.filter((_, currIndex) => currIndex !== index),
    }));
  }
    




  const addUserText = () => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [
        ...prevData.chatBubbles,
        new chatBubble("user", prevData.currText, userIndex),
      ],
      currText: "",
    }));

    setData((prevData) => ({
      ...prevData,
      readyToGenerate: true,
    }));
    // console.log(userIndex);
    setUserIndex((prev) => prev + 1);
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

    setData((prevData) => ({
      ...prevData,
      readyToGenerate: false,
    }));
    // console.log(modelIndex);
    setModelIndex(modelIndex + 1);
  };

  const addImage = (src) => {
    setData((prevData) => ({
      ...prevData,
      currImages: [...prevData.currImages, src],
    }));
  };

  const deleteImage = (index) => {
    setData((prevData) => ({
      ...prevData,
      currImages: prevData.currImages.filter(
        (_, currIndex) => currIndex !== index
      ),
    }));
  };

  // change to pushImages maybe?
  const addImages = () => {
    for (let i = 0, len = data.currImages.length; i < len; i++) {
      setData((prevData) => ({
        ...prevData,
        chatBubbles: [
          ...prevData.chatBubbles,
          new chatBubble("image", data.currImages[i], userIndex),
        ],
      }));
      setUserIndex((prev) => prev + 1);
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

  const updateTitle = (index, title) => {
    setPrompts((prevPrompts) => {
      const newPromptTitles = [...prevPrompts.promptTitles];
      newPromptTitles[index] = title;
      return { ...prevPrompts, promptTitles: newPromptTitles };
    });
   // console.log(prompts.promptTitles);
  };

  return (
    <DataContext.Provider
      value={{
        data,
        prompts,
        addUserText,
        addResponseText,
        clearCurrText,
        updateData,
        updateTitle,
        imageEmpty,
        textEmpty,
        addImage,
        deleteImage,
        addImages,
        clearCurrImages,
        readyToGenerate,
        addPrompt,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
