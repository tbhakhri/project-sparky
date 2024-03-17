import React, { createContext, useState, useContext } from "react"

const DataContext = createContext()

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  class chatBubble {
    constructor(type, text) {
      this.type = type
      this.text = text
    }
  }

  const [data, setData] = useState({
    chatBubbles: [],
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

  const addResponseText = () => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [
        ...prevData.chatBubbles,
        new chatBubble(
          "response",
          "This is a DUMMY RESPONSE to the user's message!!"
        )
      ]
    }))

    setReadyToGenerate(false)
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
        addResponseText,
        updateData,
        readyToGenerate
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
