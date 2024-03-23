import { createContext, useState, useContext } from "react"

const DataContext = createContext()
export const useData = () => useContext(DataContext)

class chatBubble {
  constructor(type, text) {
    this.type = type
    this.text = text
  }
}

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    variants: [
      {
        chatBubbles: [],
        responses: []
      }
    ],
    currentVariant: 0
  })

  /** FUNCTIONS **/
  /* For the currentVariant, pushes text to the requestChain. */
  function pushUserText(text) {
    setData((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      targetVariant.chatBubbles = [
        ...targetVariant.chatBubbles,
        new chatBubble("user", text)
      ]

      newVariants[prevData.currentVariant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* For the currentVariant, pushes an array of images to the requestChain. */
  function pushImages(images) {
    setData((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      const toInsert = images.map((image) => new chatBubble("image", image))
      targetVariant.chatBubbles = [...targetVariant.chatBubbles, ...toInsert]

      newVariants[prevData.currentVariant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* For the currentVariant, deletes a request node/bubble at the specified index. */
  function deleteRequest(index) {
    setData((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      targetVariant.chatBubbles = [
        ...targetVariant.chatBubbles.slice(0, index),
        ...targetVariant.chatBubbles.slice(index + 1)
      ]

      newVariants[prevData.currentVariant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* For the currentVariant, adds a response node/bubble. */
  //TODO: CHANGE ONCE BACKEND IS IMPLEMENTED
  function addResponse() {
    setData((prevData) => {
      const newVariants = [...prevData.variants]

      const targetVariant = { ...newVariants[prevData.currentVariant] }
      targetVariant.responses = [
        ...targetVariant.responses,
        new chatBubble(
          "text",
          "This is a DUMMY RESPONSE to the user's message!!"
        )
      ]

      newVariants[prevData.currentVariant] = targetVariant

      return {
        ...prevData,
        variants: newVariants
      }
    })
  }

  /* For the currentVariant, takes the response at the specified index and converts it into a request node. Appends that request node to the requestChain. */
  function acceptResponse(index) {}

  /* For the currentVariant, clears all responses */
  function clearResponses() {
    setData((prevData) => ({
      ...prevData,
      responses: []
    }))
  }

  /* Creates a new variant, copying the specified variant's requestChain to the new variant. */
  function copyVariant(index) {}

  /* Setter function for currentVariant. */
  function setCurrentVariant(index) {
    setData((prevData) => ({
      ...prevData,
      currentVariant: index
    }))
  }

  /** END FUNCTIONS **/

  return (
    <DataContext.Provider
      value={{
        data,
        pushUserText,
        pushImages,
        deleteRequest,
        addResponse,
        acceptResponse,
        clearResponses,
        copyVariant,
        setCurrentVariant
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
