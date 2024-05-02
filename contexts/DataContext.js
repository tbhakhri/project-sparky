"use client"
import React, { createContext, useState, useContext } from "react"
import {
  filePathToPart,
  generatePromptID,
  constructChatHistory,
  generateFileID
} from "%/utils"
import { GoogleGenerativeAI } from "@google/generative-ai"
import { storage } from "%/config"
import { ref, uploadBytes } from "firebase/storage"

const DataContext = createContext()
export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  class Node {
    constructor(type, data) {
      this.type = type
      this.data = data
    }
  }

  class Variant {
    constructor() {
      this.variantHistory = []
      this.currentRequests = []
      this.currentResponses = []
      this.currentResponseIndex = 0
    }
  }
  let model = null
  if (apiKey !== "") {
    const genAI = new GoogleGenerativeAI(apiKey)
    model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest"
    })
  }

  /** STATE **/

  const [apiKey, setApiKey] = useState("")

  const [currentPrompt, setCurrentPrompt] = useState({
    promptID: generatePromptID(),
    promptName: "New Prompt",
    variants: [new Variant()],
    currentVariant: 0,
    hasGeneratedName: false
  })
  const [promptNames, setPromptNames] = useState([])

  /* When true, means that data is currently being retrieved from firestore, to be stored in currentPrompt. */
  const [isCurrentPromptLoading, setIsCurrentPromptLoading] = useState(false)

  // NOTE: This is hard-coded for up to 3 variants
  const [isResponseLoading, setIsResponseLoading] = useState([
    false,
    false,
    false
  ])

  /* When true, triggers current prompt to be saved in firestore. */
  const [queueSave, setQueueSave] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")
  function closeErrorBox() {
    setErrorMessage("")
  }

  /** END STATE **/

  /** FUNCTIONS **/

  /* Uses the Gemini API to generate a short prompt name based on the specified input msg */
  async function generateTitle(msg) {
    try {
      const prompt = [
        "If you were a chatbot, describe the following input as a prompt title in about 7 words or less:"
      ].concat(msg)
      const result = await model.generateContent(prompt)
      const response = await result.response
      const text = response.text()
      console.log("generated title: ", text)
      return text
    } catch (error) {
      console.error("Error creating title for prompt: ", error)
      throw new Error(error)
    }
  }

  /* For the currentVariant, pushes text to the requestChain. */
  async function pushUserText(text) {
    text = text.trim()
    setQueueSave(true)
    text = text.trim()

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

  /* For the currentVariant, pushes an array of files to currentRequest. */
  async function pushFiles(userID, files) {
    try {
      const newVariants = [...currentPrompt.variants]
      const targetVariant = { ...newVariants[currentPrompt.currentVariant] }

      const convertedFiles = await Promise.all(
        files.map(async ([fileType, file]) => {
          const filePath = `${userID}/${currentPrompt.promptID}/${generateFileID()}`
          const fileRef = ref(storage, filePath)
          try {
            await uploadBytes(fileRef, file)
            return new Node(fileType, filePath)
          } catch (error) {
            console.error("Error uploading file:", error)
          }
        })
      )

      targetVariant.currentRequests = [
        ...targetVariant.currentRequests,
        ...convertedFiles
      ]
      newVariants[currentPrompt.currentVariant] = targetVariant

      setQueueSave(true)
      setCurrentPrompt({ ...currentPrompt, variants: newVariants })
    } catch (error) {
      console.error("Error processing files:", error)
    }
  }

  /* For the specified variant, deletes a request node/bubble at the specified index. */
  function deleteRequest(variant, index) {
    setQueueSave(true)
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

  /* For the specified variant, deletes a request node/bubble at the specified index. */
  function editRequestText(variant, index, newText) {
    setQueueSave(true)
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

  /* For the specified variant, adds a response node/bubble.
  If a promptName has not been generated yet, do so. */
  async function addResponse(variantIndex) {
    console.log("CALLING ADD RESPONSE")
    setIsResponseLoading([
      ...isResponseLoading.slice(0, variantIndex),
      true,
      ...isResponseLoading.slice(variantIndex + 1)
    ])
    console.log(
      "formatted history",
      await constructChatHistory(
        currentPrompt.variants[variantIndex].variantHistory
      )
    )
    const chat = model.startChat({
      history: await constructChatHistory(
        currentPrompt.variants[variantIndex].variantHistory
      ),
      generationConfig: {
        maxOutputTokens: 2048
      }
    })

    const nodeList = currentPrompt.variants[variantIndex].currentRequests
    const textParts = nodeList
      .filter((node) => node.type === "text")
      .map((node) => node.data)

    const imageNodes = nodeList.filter((node) => node.type === "image")
    const imageParts = await Promise.all(
      imageNodes.map(async (node) => {
        try {
          return await filePathToPart(node.data)
        } catch (error) {
          console.error("Error downloading image:", error)
        }
      })
    )
    const audioNodes = nodeList.filter((node) => node.type === "audio")
    const audioParts = await Promise.all(
      audioNodes.map(async (node) => {
        try {
          return await filePathToPart(node.data)
        } catch (error) {
          console.error("Error downloading audio:", error)
        }
      })
    )
    const msg = textParts.concat(imageParts).concat(audioParts)
    console.log("msg: ", msg)
    let generatedName = ""
    try {
      if (!currentPrompt.hasGeneratedName) {
        generatedName = await generateTitle(msg)
      }
    } catch (error) {
      console.error(error)
      generatedName = "New Prompt"
    }

    try {
      const result = await chat.sendMessage(msg)
      console.log(result)
      const responseText = result.response.text()
      setQueueSave(true)
      setCurrentPrompt((prevData) => {
        const newVariants = [...prevData.variants]

        const targetVariant = { ...newVariants[variantIndex] }
        targetVariant.currentResponses = [
          ...targetVariant.currentResponses,
          new Node("modelText", responseText)
        ]

        newVariants[variantIndex] = targetVariant

        if (prevData.hasGeneratedName) {
          return {
            ...prevData,
            variants: newVariants
          }
        } else {
          return {
            ...prevData,
            variants: newVariants,
            hasGeneratedName: true,
            promptName: generatedName
          }
        }
      })
    } catch (error) {
      setErrorMessage(error.message)
      throw new Error("Error in addResponse function: " + error.message)
    } finally {
      setIsResponseLoading([
        ...isResponseLoading.slice(0, variantIndex),
        false,
        ...isResponseLoading.slice(variantIndex + 1)
      ])
    }
  }

  /* For the currentVariant, takes the currentRequests and the selected currentReponse and appends it to the variantHistory */
  function updateVariantHistory() {
    if (
      currentPrompt.variants[currentPrompt.currentVariant].currentResponses
        .length === 0
    )
      return
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      const acceptedResponse =
        targetVariant.currentResponses[targetVariant.currentResponseIndex]

      targetVariant.variantHistory = [
        ...targetVariant.variantHistory,
        ...targetVariant.currentRequests,
        acceptedResponse
      ]
      targetVariant.currentRequests = []
      targetVariant.currentResponses = []
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
      currentPrompt.variants[currentPrompt.currentVariant].currentResponses
        .length === 0
    )
      return
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      targetVariant.currentResponses = []
      targetVariant.currentResponseIndex = 0

      newVariants[prevData.currentVariant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* Creates a new variant, copying the specified variant's currentRequests to the new variant. */
  function copyVariant(index) {
    setCurrentPrompt((prevData) => {
      const variantToCopy = { ...prevData.variants[index] }

      // Deep copy currentRequests array
      const deepCopiedRequests = variantToCopy.currentRequests.map((bubble) => {
        return { ...bubble }
      })

      const copiedVariant = new Variant()
      copiedVariant.variantHistory = [...variantToCopy.variantHistory]
      copiedVariant.currentRequests = deepCopiedRequests

      const newVariants = [...prevData.variants, copiedVariant]

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

  /* True when the state of currentPrompt is equivalent to a newly initialized prompt (i.e. no requests at all). */
  function isCurrentPromptEmpty() {
    return (
      currentPrompt.variants.length === 1 &&
      currentPrompt.variants[0].currentRequests.length === 0 &&
      currentPrompt.variants[0].variantHistory.length === 0
    )
  }

  /* Sets currentPrompt to reflect a newly initialized prompt. */
  function initializeNewPrompt() {
    setCurrentPrompt({
      promptID: generatePromptID(),
      promptName: "New Prompt",
      variants: [new Variant()],
      currentVariant: 0,
      hasGeneratedName: false
    })
  }
  /** END FUNCTIONS **/

  return (
    <DataContext.Provider
      value={{
        currentPrompt,
        setCurrentPrompt,
        promptNames,
        setPromptNames,
        apiKey,
        setApiKey,
        isResponseLoading,
        errorMessage,
        setErrorMessage,
        closeErrorBox,
        queueSave,
        setQueueSave,
        isCurrentPromptLoading,
        setIsCurrentPromptLoading,
        pushUserText,
        pushFiles,
        deleteRequest,
        editRequestText,
        addResponse,
        clearResponses,
        updateVariantHistory,
        copyVariant,
        setCurrentVariant,
        setCurrentResponseIndex,
        isCurrentPromptEmpty,
        initializeNewPrompt
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
