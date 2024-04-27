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

export default function IdeaBox({ text, pathToSvg, alt, involvesImage }) {
  const { handleImageSelect, pushUserText, clearCurrText} = useData();

  const handleClick = () => {
    if (involvesImage) {
      const fileInput = document.getElementById('fileInput');
      fileInput.click();
      pushUserText(text);
    } else {
      console.log("ANIKAAAAA");
      pushUserText(text);

    }
  };

  return (
    <div className="box" onClick={handleClick}>
      <Image src={pathToSvg} className="img" alt={alt} width={15} height={15} />
      <br /> 
      <div className="text">{text}</div>
      {involvesImage && <input type="file" id="fileInput" style={{ display: 'none' }} onChange={handleImageSelect} />}
    </div>
  );
}
