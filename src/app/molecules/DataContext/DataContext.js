import React, { createContext, useState, useContext } from "react"

const DataContext = createContext()

export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  class chatBubble {
    constructor(type, text, index) {
      this.type = type
      this.text = text
      this.index = index
    }
  }

  const [data, setData] = useState({
    chatBubbles: [],
    currText: "",
    currImages: [],
    readyToGenerate: false
  })
  const [userIndex, setUserIndex] = useState(0)
  const [modelIndex, setModelIndex] = useState(0)

  console.log(data.chatBubbles)

  const addUserText = () => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [
        ...prevData.chatBubbles,
        new chatBubble("user", prevData.currText, userIndex)
      ],
      currText: ""
    }))

    setData((prevData) => ({
      ...prevData,
      readyToGenerate: true
    }))
    setUserIndex((prev) => prev + 1)
  }

  const addResponseText = () => {
    setData((prevData) => ({
      ...prevData,
      chatBubbles: [
        ...prevData.chatBubbles,
        new chatBubble(
          "response",
          "This is a DUMMY RESPONSE to the user's message!!",
          modelIndex
        )
      ]
    }))

    setData((prevData) => ({
      ...prevData,
      readyToGenerate: false
    }))
    setModelIndex(modelIndex + 1)
  }

  const addImage = (src) => {
    setData((prevData) => ({
      ...prevData,
      currImages: [...prevData.currImages, src]
    }))
  }

  const deleteImage = (index) => {
    setData((prevData) => ({
      ...prevData,
      currImages: prevData.currImages.filter(
        (_, currIndex) => currIndex !== index
      )
    }))
  }

  // change to pushImages maybe?
  const addImages = () => {
    for (let i = 0, len = data.currImages.length; i < len; i++) {
      setData((prevData) => ({
        ...prevData,
        chatBubbles: [
          ...prevData.chatBubbles,
          new chatBubble("image", data.currImages[i], userIndex)
        ]
      }))
      setUserIndex((prev) => prev + 1)
    }

    setData((prevData) => ({
      ...prevData,
      readyToGenerate: true
    }))
  }

  const textEmpty = () => {
    if (data.currText == "") {
      return true
    } else {
      return false
    }
  }

  const imageEmpty = () => {
    if (data.currImages.length == 0) {
      return true
    } else {
      return false
    }
  }

  const clearCurrText = () => {
    updateData({ currText: "" })
  }

  const clearCurrImages = () => {
    updateData({ currImages: [] })
  }

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }))
  }

  const readyToGenerate = () => {
    return data.readyToGenerate
  }

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
        deleteImage,
        addImages,
        clearCurrImages,
        readyToGenerate
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
