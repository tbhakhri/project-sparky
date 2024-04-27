// import "./IdeaBox.css"
// import Image from "next/image"
// import { useData } from "%/DataContext"
// import AuthContext from "%/authContext"


// export default function IdeaBox({ text, pathToSvg, alt, handleClick }) {
//   const {
//     handleImageSelect,
//   } = useData()

//   return (
//     <div className="box" onClick={handleClick}>
//       <Image src={pathToSvg} className="img" alt={alt} width={15} height={15} />
//       <br /> <div className="text">{text}</div>
//     </div>
    
//   )
// }

import "./IdeaBox.css";
import Image from "next/image";
import { useData } from "%/DataContext";
import AuthContext from "%/authContext";

export default function IdeaBox({ imageAndText, displayText, inputText, pathToSvg, alt, involvesImage }) {
  const { handleImageSelect, pushUserText, clearCurrText, deletePrompt} = useData();

  const handleClick = () => {
    if (involvesImage) {
      const fileInput = document.getElementById('fileInput');
      fileInput.click();
      if (imageAndText) {
        clearCurrText()
        pushUserText(inputText);
        console.log("is this logging twice?")
      }
    } else {
      pushUserText(inputText);
    }
  };

  return (
    <div className="box" onClick={handleClick}>
      <Image src={pathToSvg} className="img" alt={alt} width={15} height={15} />
      <br /> 
      <div className="text">{displayText}</div>
      {involvesImage && <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageSelect} />}
    </div>
  );
}
