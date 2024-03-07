'use client';

import './text_input_styles.css'
import Image from '@/node_modules/next/image';
import cameraIcon from "/public/icons/camera.svg"
import imageIcon from "/public/icons/image.svg"
import microphoneIcon from "/public/icons/microphone.svg"
import React, { useState } from 'react';


export default function TextBox() {
    const [text, setText] = React.useState('');
    const handleInputChange = (e) => {
        setText(e.target.value);
      };
    return (
    
    <div className="main_container">
        <div className="text_container">
            <input
            type="text"
            className="text_container_text"
            value={text}
            onChange={handleInputChange}
            placeholder="Start typing..."
            />
            {/* <div className="text_container_text">
                Start typing...
            </div> */}
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