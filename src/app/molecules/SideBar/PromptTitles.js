import { Kumbh_Sans } from "next/font/google"
import "./PromptTitles.css"
import Image from "next/image"
import { useData } from "%/DataContext";
import { useState, useRef, useEffect } from "react"
import { GoogleGenerativeAI } from "@google/generative-ai";

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] })

export default function PromptTitles({ initialTitle, index, isEditing, setEditing, selectPrompt, toggleSidebar, API_KEY }) {
    const { updateTitle } = useData()

    const [title, setTitle] = useState(initialTitle) 
    const genAI = new GoogleGenerativeAI(API_KEY);
    useEffect(() => {
        async function generateTitle() {
          try {
            const prompt = "Describe the following text as a prompt title in 11 words or less:" + initialTitle;
            const model = genAI.getGenerativeModel({ model: "gemini-pro"});
            const result = await model.generateContent(prompt);
            const response = await result.response;
            const text = response.text();
            console.log(text);

            setTitle(text)
          } catch (error) {
            console.error('Error creating title for prompt: ', error);
          }
        }
        generateTitle();
      }, [initialTitle])

    // useEffect(() => {
    //     setTitle(initialTitle)
    //   }, [initialTitle])
   
    const commitEdit = () => {
      updateTitle(index, title); 
      setEditing(-1); 
  };

    const handleEdit = (e) => {
        setTitle(e.target.value)
      }
    
      const handleTitleClick = () => {
        if (!isEditing) {
            selectPrompt(index);
            toggleSidebar();
        }
    };

    const inputRef = useRef(null)
    
    // useEffect(() => {
    //   const textarea = inputRef.current
    //   textarea.style.height = "0.65rem"
    //   textarea.style.height = textarea.scrollHeight + "px"
    // }, [title])
    
    useEffect(() => {
      if (inputRef.current && isEditing) {
          inputRef.current.focus();
      }
  }, [isEditing]);


    return(
        // <input
        // ref={inputRef}
        // value={title}
        // onChange={handleEdit}
        // onBlur={commitEdit}
        // //onKeyDown={handleKeyDown}
        // // className="pastPromptContainer" 
        // className="promptItem" 
        // />
        isEditing ? (
          <input
              ref={inputRef}
              value={title}
              onChange={handleEdit}
              onBlur={commitEdit}
              className="promptItem"
              autoFocus
          />
      ) : (
        <div onClick={handleTitleClick} className="promptItem">
          {title}
        </div>
          // <div onClick={() => setEditing(index)} className="promptItem">
          //     {title}
          // </div>
    )
    );
    
    
}
