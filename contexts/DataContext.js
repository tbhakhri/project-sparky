"use client"

import React, { createContext, useState, useContext } from "react"

const DataContext = createContext()
export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  class Node {
    constructor(type, text, index) {
      this.type = type
      this.text = text
      this.index = index
    }
  }

  const [apiKey, setApiKey] = useState("")

  const [currentPrompt, setCurrentPrompt] = useState({
    variants: [
      {
        currentRequests: [],
        responses: [],
        currentResponseIndex: 0
      }
    ],
    currentVariant: 0
  })

  const [prompts, setPrompts] = useState({
    promptData: [],
    promptTitles: [],
    editingIndex: -1
  })

  /** FUNCTIONS **/
  /* For the currentVariant, pushes text to the requestChain. */
  function pushUserText(text) {
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      targetVariant.currentRequests = [
        ...targetVariant.currentRequests,
        new Node("text", text)
      ]

      newVariants[prevData.currentVariant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* For the currentVariant, pushes an array of images to the requestChain. */
  async function pushImages(images) {
    try {
      const newVariants = [...currentPrompt.variants]
      const targetVariant = { ...newVariants[currentPrompt.currentVariant] }

      const convertedImages = await Promise.all(
        images.map(async (image) => {
          const reader = new FileReader()
          return new Promise((resolve, _) => {
            reader.onload = (event) =>
              resolve(new Node("image", event.target.result))
            reader.readAsDataURL(image)
          })
        })
      )

      targetVariant.currentRequests = [
        ...targetVariant.currentRequests,
        ...convertedImages
      ]
      newVariants[currentPrompt.currentVariant] = targetVariant

      setCurrentPrompt({ ...currentPrompt, variants: newVariants })
    } catch (error) {
      console.error("Error processing images:", error)
    }
  }

  /* For the specified variant, deletes a request node/bubble at the specified index. */
  function deleteRequest(variant, index) {
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[variant] }
      targetVariant.currentRequests = [
        ...targetVariant.currentRequests.slice(0, index),
        ...targetVariant.currentRequests.slice(index + 1)
      ]

      newVariants[variant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  const deleteImage = (index) => {
    setCurrentPrompt((prevData) => ({
      ...prevData,
      currImages: prevData.currImages.filter(
        (_, currIndex) => currIndex !== index
      )
    }))
  }

  /* For the specified variant, deletes a request node/bubble at the specified index. */
  function editRequestText(variant, index, newText) {
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[variant] }
      targetVariant.currentRequests[index] = new Node("text", newText)

      newVariants[variant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* For the specified variant, adds a response node/bubble. */
  //TODO: CHANGE ONCE BACKEND IS IMPLEMENTED
  function addResponse(variant) {
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[variant] }
      targetVariant.responses = [
        ...targetVariant.responses,
        new Node("text", "This is a DUMMY RESPONSE to the user's message!!")
      ]

      newVariants[variant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* For the currentVariant, takes the response at the currentResponseIndex and converts it into a request node. Appends that request node to the requestChain. */
  function acceptResponse() {
    if (
      currentPrompt.variants[currentPrompt.currentVariant].responses.length ===
      0
    )
      return
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      const acceptedResponse =
        targetVariant.responses[targetVariant.currentResponseIndex]

      targetVariant.currentRequests = [
        ...targetVariant.currentRequests,
        acceptedResponse
      ]
      targetVariant.responses = []
      targetVariant.currentResponseIndex = 0

      newVariants[prevData.currentVariant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* For the currentVariant, clears all responses */
  function clearResponses() {
    if (
      currentPrompt.variants[currentPrompt.currentVariant].responses.length ===
      0
    )
      return
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      targetVariant.responses = []
      targetVariant.currentResponseIndex = 0

      newVariants[prevData.currentVariant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* Creates a new variant, copying the specified variant's requestChain to the new variant. */
  function copyVariant(index) {
    setCurrentPrompt((prevData) => {
      const variantToCopy = { ...prevData.variants[index] }

      // Deep copy currentRequests array
      const deepCopiedRequests = variantToCopy.currentRequests.map((bubble) => {
        return { ...bubble }
      })

      const newVariants = [
        ...prevData.variants,
        {
          currentRequests: deepCopiedRequests,
          responses: [],
          currentResponseIndex: 0
        }
      ]

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* Setter function for currentVariant. */
  function setCurrentVariant(index) {
    setCurrentPrompt((prevData) => ({
      ...prevData,
      currentVariant: index
    }))
  }

  /* Setter function for currentResponseIndex for the specified variant. */
  function setCurrentResponseIndex(variant, index) {
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[variant] }
      targetVariant.currentResponseIndex = index

      newVariants[variant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  function addPrompt() {
    if (currentPrompt.variants[0].currentRequests.length > 0) {
      setPrompts((prevPrompts) => ({
        ...prevPrompts,
        promptData: [...prevPrompts.promptData, { ...currentPrompt }],
        promptTitles: [
          ...prevPrompts.promptTitles,
          currentPrompt.variants[0].currentRequests[0]?.text
        ]
      }))
    }

    setCurrentPrompt({
      variants: [
        {
          currentRequests: [],
          responses: [],
          currentResponseIndex: 0
        }
      ],
      currentVariant: 0
    })
  }

  function editPrompt(index) {
    //simply for setting it to an editable state
    setPrompts((prevState) => ({
      ...prevState,
      editingIndex: index
    }))
  }

  const deletePrompt = (index) => {
    setPrompts((prevPrompts) => ({
      ...prevPrompts,
      promptData: prevPrompts.promptData.filter(
        (_, currIndex) => currIndex !== index
      ),
      promptTitles: prevPrompts.promptTitles.filter(
        (_, currIndex) => currIndex !== index
      )
    }))
  }

  const popPrompt = (index) => {
    const prompt = prompts.promptData[index]

    setPrompts((prevPrompts) => ({
      ...prevPrompts,
      promptData: prevPrompts.promptData.filter(
        (_, currIndex) => currIndex !== index
      ),
      promptTitles: prevPrompts.promptTitles.filter(
        (_, currIndex) => currIndex !== index
      )
    }))

    return prompt
  }

  const textEmpty = () => {
    if (currentPrompt.currText == "") {
      return true
    } else {
      return false
    }
  }

  const imageEmpty = () => {
    if (currentPrompt.currImages.length == 0) {
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

  const selectPrompt = (index) => {
    addPrompt()
    setCurrentPrompt(popPrompt(index))
  }

  const updateData = (newData) => {
    setCurrentPrompt((prev) => ({ ...prev, ...newData }))
  }

  const updateTitle = (index, title) => {
    setPrompts((prevPrompts) => {
      const newPromptTitles = [...prevPrompts.promptTitles]
      newPromptTitles[index] = title
      return { ...prevPrompts, promptTitles: newPromptTitles }
    })
  }

  /** END FUNCTIONS **/

  return (
    <DataContext.Provider
      value={{
        currentPrompt,
        prompts,
        apiKey,
        setApiKey,
        pushUserText,
        pushImages,
        deleteRequest,
        editRequestText,
        addResponse,
        acceptResponse,
        clearResponses,
        copyVariant,
        setCurrentVariant,
        setCurrentResponseIndex,
        clearCurrText,
        updateData,
        updateTitle,
        imageEmpty,
        textEmpty,
        deleteImage,
        clearCurrImages,
        addPrompt,
        selectPrompt,
        editPrompt,
        deletePrompt
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
