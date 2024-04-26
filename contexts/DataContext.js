"use client";

import React, { createContext, useState, useContext } from "react";
import AuthContext from "./authContext";
import {
  filePathToPart,
  generatePromptID,
  generateImageID,
  constructChatHistory,
} from "%/utils";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { storage } from "%/config";
import { ref, uploadBytes } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { db } from "%/config";

const DataContext = createContext();
export const useData = () => useContext(DataContext);

export const DataProvider = ({ children }) => {
  class Node {
    constructor(type, data) {
      this.type = type;
      this.data = data;
    }
  }

  class Variant {
    constructor() {
      this.variantHistory = [];
      this.currentRequests = [];
      this.currentResponses = [];
      this.currentResponseIndex = 0;
    }
  }

  const [apiKey, setApiKey] = useState("");
  const { userID } = useContext(AuthContext);

  let model = null;
  if (apiKey !== "") {
    const genAI = new GoogleGenerativeAI(apiKey);
    model = genAI.getGenerativeModel({
      model: "gemini-1.5-pro-latest",
    });
  }

  // NOTE: This is hard-coded for up to 3 variants
  const [isResponseLoading, setIsResponseLoading] = useState([
    false,
    false,
    false,
  ]);
  const [errorMessage, setErrorMessage] = useState("");
  function closeErrorBox() {
    setErrorMessage("");
  }

  const [currentPrompt, setCurrentPrompt] = useState({
    id: generatePromptID(),
    variants: [new Variant()],
    currentVariant: 0,
  });

  const [prompts, setPrompts] = useState({
    promptData: [],
    promptTitles: [],
    editingIndex: -1,
  });

  /** FUNCTIONS **/
  /* For the currentVariant, pushes text to the requestChain. */
  async function pushUserText(text) {
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants];

      const targetVariant = { ...newVariants[prevData.currentVariant] };
      targetVariant.currentRequests = [
        ...targetVariant.currentRequests,
        new Node("text", text),
      ];

      newVariants[prevData.currentVariant] = targetVariant;

      return {
        ...prevData,
        variants: newVariants,
      };
    });
  }

  /* For the currentVariant, pushes an array of images to the requestChain. */
  async function pushImages(userID, images) {
    try {
      const newVariants = [...currentPrompt.variants];
      const targetVariant = { ...newVariants[currentPrompt.currentVariant] };

      const convertedImages = await Promise.all(
        images.map(async (image) => {
          const filePath = `${userID}/${currentPrompt.id}/${generateImageID()}`;
          const imageRef = ref(storage, filePath);
          try {
            await uploadBytes(imageRef, image);
            return new Node("image", filePath);
          } catch (error) {
            console.error("Error uploading image:", error);
          }
        })
      );

      targetVariant.currentRequests = [
        ...targetVariant.currentRequests,
        ...convertedImages,
      ];
      newVariants[currentPrompt.currentVariant] = targetVariant;

      setCurrentPrompt({ ...currentPrompt, variants: newVariants });
    } catch (error) {
      console.error("Error processing images:", error);
    }
  }

  /* For the specified variant, deletes a request node/bubble at the specified index. */
  function deleteRequest(variant, index) {
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants];

      const targetVariant = { ...newVariants[variant] };
      targetVariant.currentRequests = [
        ...targetVariant.currentRequests.slice(0, index),
        ...targetVariant.currentRequests.slice(index + 1),
      ];

      newVariants[variant] = targetVariant;

      return {
        ...prevData,
        variants: newVariants,
      };
    });
  }

  /* For the specified variant, deletes a request node/bubble at the specified index. */
  function editRequestText(variant, index, newText) {
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants];

      const targetVariant = { ...newVariants[variant] };
      targetVariant.currentRequests[index] = new Node("text", newText);

      newVariants[variant] = targetVariant;

      return {
        ...prevData,
        variants: newVariants,
      };
    });
  }

  /* For the specified variant, adds a response node/bubble. */
  async function addResponse(variantIndex) {
    console.log("CALLING ADD RESPONSE");
    setIsResponseLoading([
      ...isResponseLoading.slice(0, variantIndex),
      true,
      ...isResponseLoading.slice(variantIndex + 1),
    ]);
    console.log(
      "formatted history",
      await constructChatHistory(
        currentPrompt.variants[variantIndex].variantHistory
      )
    );
    const chat = model.startChat({
      history: await constructChatHistory(
        currentPrompt.variants[variantIndex].variantHistory
      ),
      generationConfig: {
        maxOutputTokens: 2048,
      },
    });

    const nodeList = currentPrompt.variants[variantIndex].currentRequests;
    const textParts = nodeList
      .filter((node) => node.type === "text")
      .map((node) => node.data);
    const imageNodes = nodeList.filter((node) => node.type === "image");
    const imageParts = await Promise.all(
      imageNodes.map(async (node) => {
        try {
          return await filePathToPart(node.data);
        } catch (error) {
          console.error("Error downloading image:", error);
        }
      })
    );
    const msg = textParts.concat(imageParts);
    console.log("msg: ", msg);

    try {
      const result = await chat.sendMessage(msg);
      console.log(result);
      setCurrentPrompt((prevData) => {
        const newVariants = [...prevData.variants];

        const targetVariant = { ...newVariants[variantIndex] };
        targetVariant.currentResponses = [
          ...targetVariant.currentResponses,
          new Node("modelText", result.response.text()),
        ];

        newVariants[variantIndex] = targetVariant;

        storeUserResponse(userID, prevData, prompts.promptTitles);

        return {
          ...prevData,
          variants: newVariants,
        };
      });
    } catch (error) {
      setErrorMessage(error.message);
      throw new Error("Error in addResponse function: " + error.message);
    } finally {
      setIsResponseLoading([
        ...isResponseLoading.slice(0, variantIndex),
        false,
        ...isResponseLoading.slice(variantIndex + 1),
      ]);
    }
  }

  /* For the currentVariant, takes the currentRequests and the selected currentReponse and appends it to the variantHistory */
  function updateVariantHistory() {
    if (
      currentPrompt.variants[currentPrompt.currentVariant].currentResponses
        .length === 0
    )
      return;
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants];

      const targetVariant = { ...newVariants[prevData.currentVariant] };
      const acceptedResponse =
        targetVariant.currentResponses[targetVariant.currentResponseIndex];

      targetVariant.variantHistory = [
        ...targetVariant.variantHistory,
        ...targetVariant.currentRequests,
        acceptedResponse,
      ];
      targetVariant.currentRequests = [];
      targetVariant.currentResponses = [];
      targetVariant.currentResponseIndex = 0;

      newVariants[prevData.currentVariant] = targetVariant;

      return {
        ...prevData,
        variants: newVariants,
      };
    });
  }

  /* For the currentVariant, clears all responses */
  function clearResponses() {
    if (
      currentPrompt.variants[currentPrompt.currentVariant].currentResponses
        .length === 0
    )
      return;
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants];

      const targetVariant = { ...newVariants[prevData.currentVariant] };
      targetVariant.currentResponses = [];
      targetVariant.currentResponseIndex = 0;

      newVariants[prevData.currentVariant] = targetVariant;

      return {
        ...prevData,
        variants: newVariants,
      };
    });
  }

  /* Creates a new variant, copying the specified variant's requestChain to the new variant. */
  function copyVariant(index) {
    setCurrentPrompt((prevData) => {
      const variantToCopy = { ...prevData.variants[index] };

      // Deep copy currentRequests array
      const deepCopiedRequests = variantToCopy.currentRequests.map((bubble) => {
        return { ...bubble };
      });

      const copiedVariant = new Variant();
      copiedVariant.variantHistory = [...variantToCopy.variantHistory];
      copiedVariant.currentRequests = deepCopiedRequests;

      const newVariants = [...prevData.variants, copiedVariant];

      return {
        ...prevData,
        variants: newVariants,
      };
    });
  }

  /* Setter function for currentVariant. */
  function setCurrentVariant(index) {
    setCurrentPrompt((prevData) => ({
      ...prevData,
      currentVariant: index,
    }));
  }

  /* Setter function for currentResponseIndex for the specified variant. */
  function setCurrentResponseIndex(variant, index) {
    setCurrentPrompt((prevData) => {
      const newVariants = [...prevData.variants];

      const targetVariant = { ...newVariants[variant] };
      targetVariant.currentResponseIndex = index;

      newVariants[variant] = targetVariant;

      return {
        ...prevData,
        variants: newVariants,
      };
    });
  }

  function addPrompt() {
    if (currentPrompt.variants[0].currentRequests.length > 0) {
      setPrompts((prevPrompts) => ({
        ...prevPrompts,
        promptData: [...prevPrompts.promptData, { ...currentPrompt }],
        promptTitles: [
          ...prevPrompts.promptTitles,
          currentPrompt.variants[0].currentRequests[0]?.data,
        ],
      }));
    }

    setCurrentPrompt({
      variants: [
        {
          currentRequests: [],
          currentResponses: [],
          currentResponseIndex: 0,
        },
      ],
      currentVariant: 0,
    });
  }

  function editPrompt(index) {
    //simply for setting it to an editable state
    setPrompts((prevState) => ({
      ...prevState,
      editingIndex: index,
    }));
  }

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
    if (currentPrompt.currText == "") {
      return true;
    } else {
      return false;
    }
  };

  const imageEmpty = () => {
    if (currentPrompt.currImages.length == 0) {
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
    setCurrentPrompt(popPrompt(index));
  };

  const updateData = (newData) => {
    setCurrentPrompt((prev) => ({ ...prev, ...newData }));
  };

  const updateTitle = (index, title) => {
    setPrompts((prevPrompts) => {
      const newPromptTitles = [...prevPrompts.promptTitles];
      newPromptTitles[index] = title;
      return { ...prevPrompts, promptTitles: newPromptTitles };
    });
  };

  async function storeUserResponse(userID, promptData, promptTitles) {
    const userResponsesRef = doc(
      db,
      "users",
      userID,
      "responses",
      new Date().toISOString()
    ); // Use a timestamp or another unique identifier for each response

    try {
      await setDoc(userResponsesRef, {
        promptData: promptData,
        promptTitles: promptTitles,
        timestamp: new Date(),
      });
      console.log("Response saved successfully");
    } catch (error) {
      console.error("Error saving response:", error);
    }
  }

  /** END FUNCTIONS **/

  return (
    <DataContext.Provider
      value={{
        currentPrompt,
        prompts,
        apiKey,
        isResponseLoading,
        errorMessage,
        setErrorMessage,
        closeErrorBox,
        setApiKey,
        pushUserText,
        pushImages,
        deleteRequest,
        editRequestText,
        addResponse,
        updateVariantHistory,
        clearResponses,
        copyVariant,
        setCurrentVariant,
        setCurrentResponseIndex,
        clearCurrText,
        updateData,
        updateTitle,
        imageEmpty,
        textEmpty,
        clearCurrImages,
        addPrompt,
        selectPrompt,
        editPrompt,
        deletePrompt,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
