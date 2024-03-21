import React, { createContext, useState, useContext } from "react"

const DataContext = createContext()

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  class chatBubble {
    constructor(type, text, index) {
      this.type = type
      this.text = text
    }
  }

  const [data, setData] = useState({
    chatBubbles: [],
    responses: [],
    readyToGenerate: false
  })


  const pushUserText = (text) => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [...prevData.chatBubbles, new chatBubble("user", text)]
    }))
    setReadyToGenerate(true)
  }

  const pushImages = (images) => {
    for (let i = 0, len = images.length; i < len; i++) {
      setData((prevData) => ({
        ...prevData,
        chatBubbles: [
          ...prevData.chatBubbles,
          new chatBubble("image", images[i])
        ]
      }))
    }

    setReadyToGenerate(true)
  }

  const deleteIndex = (index) => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [...prevData.chatBubbles.slice(0, index), ...prevData.chatBubbles.slice(index + 1)]
    }))
  }

  //TODO: CHANGE ONCE BACKEND IS IMPLEMENTED
  const addResponse = () => {
    setData((prevData) => ({
      ...prevData,
      responses: [
        ...prevData.responses,
        new chatBubble(
          "text",
          "This is a DUMMY RESPONSE to the user's message!!"
        )
      ]
    }))
  }

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  const readyToGenerate = () => {
    return data.readyToGenerate
  }
  const setReadyToGenerate = (bool) => {
    setData((prevData) => ({
      ...prevData,
      readyToGenerate: bool
    }))
  }

  return (
    <DataContext.Provider
      value={{
        data,
        pushUserText,
        pushImages,
        deleteIndex,
        addResponse,
        updateData,
        readyToGenerate
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
