"use client"

import React, { createContext, useState, useContext } from "react"
import { dataURLToPart } from "%/utils"
import { GoogleGenerativeAI } from "@google/generative-ai"

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

  let model = null
  if (apiKey !== "") {
    const genAI = new GoogleGenerativeAI(apiKey)
    model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest"
    })
  } else {
  }

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
  //TODO: CHANGE THIS DUMMY IMPLEMENTATION
  async function addResponse(variant) {
    const dummyDataURL =
      "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCABFAEUDASIAAhEBAxEB/8QAGwABAQACAwEAAAAAAAAAAAAAAAYEBwIDBQH/xAA4EAABAwMAAhEDAwUAAAAAAAABAAIDBAURBiEHEhUXMTQ2QVRVcnSSk7Gy0SJRYRNxgTIzQqHh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/ANbaN6NU9/irKipq6qN0dQ5gEbwBjh5wfuvb3vLf0+v8bfhNj/iFx7270Cr0EhveW/p9f42/Cb3lv6fX+Nvwq9fM6+BBI73lv6fX+Nvwm95b+n1/jb8KuJwF2wQPqnhseo5xwIIze8t/T6/xt+E3vLf0+v8AG34VnU00lHKY5Dkj8YXWg1NNS7l3u4UUM8r44nMDXPdrORnm/dFkXnlZdu2z2ogotj/iFx7270Cr1IbH/ELj3t3oFXoOLs/wvcpLKJ7e+ocHaotuMH8LxmMMsoY3n+2tWVbK236OUTRgOlhLXYODwf8AUEScgYVfoZTPaJ6kt+mJzXE5/dSAydWslbEotpadHJyQNtPAHD/E/wBP++FBNaXVray9zPaQQQ3m/C8Nc6iU1FS6QnORznK4INXXnlZdu2z2ol55WXbts9qIKLY/4hce9u9Aq9SGx/xC497d6BV6D0tHqdlRdYWvBIOeA/hW90slPXUdPGGOJjBx9WOYLW8UskDw6NzmuHO04WQbpXdKn81yCqpNCpnVIeIR+ngj+4F1aXVjoIqSjYdTY3RuBH2wFlaKzVTaZlZNUTOjDnNIe84Upeap1VcpiXEhsr8a886DAa3AXJEQauvPKy7dtntRLzysu3bZ7UQUWx/xC497d6BV6kNj/iFx7270Cr0AnCyLfSPrquNjdrjbtBycaiVjkZCyaCufb3ucxjXl2OHmwgsLzKyx2Z9BEC2QODxjWNZ/KhnEvkc93C45WRX1slxqjPI0NJAGAdWpY6AiIg1deeVl27bPaiXnlZdu2z2ogU7bna3zx0N0dCx8pc5oiByf5XfujpB12/yGoiBujpB12/yGpujpB12/yGoiBujpB12/yGpujpB12/yGoiBujpB12/yGpujpB12/yGoiDqpbZPWVVTU1NaZZpC0ucYwM8I5iiIg//9k="

    const imagePart = dataURLToPart(dummyDataURL)
    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 250
      }
    })

    const text = "Describe this image."
    const msg = [text, imagePart]
    const result = await chat.sendMessage(msg)
    console.log(result)
    console.log(result.response.text())

    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[variant] }
      targetVariant.responses = [
        ...targetVariant.responses,
        new Node("text", result.response.text())
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
