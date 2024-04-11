import { Kumbh_Sans } from "next/font/google"
import "./PromptTitles.css"
import Image from "next/image"
import { useData } from "@/molecules/DataContext/DataContext";
import { useState, useRef, useEffect } from "react"

const kumbh_sans = Kumbh_Sans({ subsets: ["latin"] })

export default function PromptTitles({ initialTitle, index }) {
    const { updateTitle, deletePrompt } = useData()

    const [title, setTitle] = useState(initialTitle) 

    useEffect(() => {
        setTitle(initialTitle)
      }, [initialTitle])
    
    const commitEdit = (_) => {
        updateTitle(index, inputRef.current.value)
    }

    const handleEdit = (e) => {
        setTitle(e.target.value)
      }
    
    const handleDeletePrompt = (_) => {
        deletePrompt(index);
    }

    const inputRef = useRef(null)
      useEffect(() => {
        const textarea = inputRef.current
        textarea.style.height = "0.65rem"
        textarea.style.height = textarea.scrollHeight + "px"
      }, [title])
    

    return(
        <><input
        ref={inputRef}
        value={title}
        onChange={handleEdit}
        onBlur={commitEdit}
        //onKeyDown={handleKeyDown}
        // className="pastPromptContainer" 
        className="promptItem" 
        /><>
        </></>
    )
    
    
}