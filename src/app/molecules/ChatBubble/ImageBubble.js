import "./ChatBubble.css";
import Image from "next/image";

export default function ImageBubble({ imageURL }) {

    return (
      <div className="bubble-container">
          <div style = {{ width: '100px', position: 'relative'}}>
              <Image 
                src={imageURL} 
                alt="added image" 
                width={50}
                height={0}
                layout="responsive"
              />
          </div>
      </div>
    );
  }
  