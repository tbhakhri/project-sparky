import { Kumbh_Sans } from "next/font/google"
import "./PromptTitles.css"
import Image from "next/image"
import { useData } from "@/molecules/DataContext/DataContext";
import { useState, useRef, useEffect } from "react"

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] })

export default function PromptTitles({ initialTitle, index, isEditing, setEditing, selectPrompt }) {
    const { updateTitle } = useData()

    const [title, setTitle] = useState(initialTitle) 

    useEffect(() => {
        setTitle(initialTitle)
      }, [initialTitle])
    
   
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
