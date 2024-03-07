import './text_input_styles.css'
import Image from '@/node_modules/next/image';
import cameraIcon from "/public/icons/camera.svg"
import imageIcon from "/public/icons/image.svg"
import microphoneIcon from "/public/icons/microphone.svg"



export default function TextBox() {
    return (
    
    <div className="main_container">
        <div className="text_container">
            <div className="text_container_text">
                Start typing...
            </div>
        </div>
        <div className="icon_container">
            <div className="tokens_remaining">
                0/12888
            </div>
            <div className="bottom_icon_positioning">
                <Image 
                    src={cameraIcon} 
                    alt="camera"
                    className="icon"
                />    
            </div>
            <div className="bottom_icon_positioning">               
                <Image 
                    src={imageIcon}
                    alt="upload image"
                    className="icon"
                />
            </div>
            <div className="bottom_icon_positioning">
                <Image 
                    src={microphoneIcon} 
                    alt="microphone"
                    className="icon"
                />
            </div>
        </div>    
    </div>
    );
}