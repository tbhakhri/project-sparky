"use client"

import React, { createContext, useState, useContext } from "react"

const DataContext = createContext()
export const useData = () => useContext(DataContext)

export const DataProvider = ({ children }) => {
  class chatBubble {
    constructor(type, text, index) {
      this.type = type
      this.text = text
      this.index = index;
    }
  }

  const [apiKey, setApiKey] = useState("")

  const [data, setData] = useState({
    variants: [
      {
        chatBubbles: [],
        responses: [],
        currentResponseIndex: 0

      }
    ],
    currentVariant: 0
  })

  const [prompts, setPrompts] = useState({
    promptData: [],
    promptTitles: [],
    editingIndex: -1,
  });

  const [userIndex, setUserIndex] = useState(0);
  const [modelIndex, setModelIndex] = useState(0);

  /** FUNCTIONS **/
  /* For the currentVariant, pushes text to the requestChain. */
  function pushUserText(text) {
    setData((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      targetVariant.chatBubbles = [
        ...targetVariant.chatBubbles,
        new chatBubble("text", text)
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
      const newVariants = [...data.variants]
      const targetVariant = { ...newVariants[data.currentVariant] }

      const convertedImages = await Promise.all(
        images.map(async (image) => {
          const reader = new FileReader()
          return new Promise((resolve, _) => {
            reader.onload = (event) =>
              resolve(new chatBubble("image", event.target.result))
            reader.readAsDataURL(image)
          })
        })
      )

      targetVariant.chatBubbles = [
        ...targetVariant.chatBubbles,
        ...convertedImages
      ]
      newVariants[data.currentVariant] = targetVariant

      setData({ ...data, variants: newVariants })
    } catch (error) {
      console.error("Error processing images:", error)
    }
  }

  /* For the specified variant, deletes a request node/bubble at the specified index. */
  function deleteRequest(variant, index) {
    setData((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[variant] }
      targetVariant.chatBubbles = [
        ...targetVariant.chatBubbles.slice(0, index),
        ...targetVariant.chatBubbles.slice(index + 1)
      ]

      newVariants[variant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  const deleteImage = (index) => {
    setData((prevData) => ({
      ...prevData,
      currImages: prevData.currImages.filter(
        (_, currIndex) => currIndex !== index
      ),
    }));
  };


  /* For the specified variant, deletes a request node/bubble at the specified index. */
  function editRequestText(variant, index, newText) {
    setData((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[variant] }
      targetVariant.chatBubbles[index] = new chatBubble("text", newText)

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
    setData((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[variant] }
      targetVariant.responses = [
        ...targetVariant.responses,
        new chatBubble(
          "text",
          "This is a DUMMY RESPONSE to the user's message!!"
        )
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
    if (data.variants[data.currentVariant].responses.length === 0) return
    setData((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      const acceptedResponse =
        targetVariant.responses[targetVariant.currentResponseIndex]

      targetVariant.chatBubbles = [
        ...targetVariant.chatBubbles,
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
    if (data.variants[data.currentVariant].responses.length === 0) return
    setData((prevData) => {
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
    setData((prevData) => {
      const variantToCopy = { ...prevData.variants[index] }

      // Deep copy chatBubbles array
      const deepCopiedChatBubbles = variantToCopy.chatBubbles.map((bubble) => {
        return { ...bubble }
      })

      const newVariants = [
        ...prevData.variants,
        {
          chatBubbles: deepCopiedChatBubbles,
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
    setData((prevData) => ({
      ...prevData,
      currentVariant: index
    }))
  }

  /* Setter function for currentResponseIndex for the specified variant. */
  function setCurrentResponseIndex(variant, index) {
    setData((prevData) => {
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

  

  function addPrompt () {
    if (data.variants[0].chatBubbles.length > 0) {
      setPrompts((prevPrompts) => ({
        ...prevPrompts,
        promptData: [...prevPrompts.promptData, { ...data }],
        promptTitles: [...prevPrompts.promptTitles, data.variants[0].chatBubbles[0]?.text],
      }));
    }

    setData({variants: [{
      chatBubbles: [],
      responses: [],
      currentResponseIndex: 0
     
     
    }], currentVariant: 0});
  };



  function editPrompt(index) {
    //simply for setting it to an editable state
    setPrompts((prevState) => ({
      ...prevState,
      editingIndex: index,
    }));
  };

  const deletePrompt = (index) => {
    setPrompts((prevPrompts) => ({
      ...prevPrompts,
      promptData: prevPrompts.promptData.filter(
        (_, currIndex) => currIndex !== index
      ),
      promptTitles: prevPrompts.promptTitles.filter(
        (_, currIndex) => currIndex !== index
      ),
    }));
  };

  const popPrompt = (index) => {
    const prompt = prompts.promptData[index];

    setPrompts((prevPrompts) => ({
      ...prevPrompts,
      promptData: prevPrompts.promptData.filter(
        (_, currIndex) => currIndex !== index
      ),
      promptTitles: prevPrompts.promptTitles.filter(
        (_, currIndex) => currIndex !== index
      ),
    }));

    return prompt;
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

  const selectPrompt = (index) => {
    addPrompt();
    setData(popPrompt(index));
  };

  const updateData = (newData) => {
    setData((prev) => ({ ...prev, ...newData }));
  };

  const updateTitle = (index, title) => {
    setPrompts((prevPrompts) => {
      const newPromptTitles = [...prevPrompts.promptTitles];
      newPromptTitles[index] = title;
      return { ...prevPrompts, promptTitles: newPromptTitles };
    });
  };

  
  

  /** END FUNCTIONS **/

  return (
    <DataContext.Provider
      value={{
        data,
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
        deletePrompt,

      }}
    >
      {children}
    </DataContext.Provider>
  )
}
