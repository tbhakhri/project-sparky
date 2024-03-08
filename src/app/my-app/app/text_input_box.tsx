'use client';

import './text_input_styles.css'
import Image from '@/node_modules/next/image';
import cameraIcon from "/public/icons/camera.svg"
import imageIcon from "/public/icons/image.svg"
import microphoneIcon from "/public/icons/microphone.svg"
import React, { useState, useRef, useEffect } from 'react';


export default function TextBox() {
    const [text, setText] = React.useState('');
    const [uploadedImages, setUploadedImages] = useState([]);
    const [tokenCount, setTokenCount] = useState(0);
    const videoRef = useRef(null);

    useEffect(() => {
        // Automatically adjust main_container based on the number of uploaded images
        const mainContainer = document.querySelector('.main_container');
        if (mainContainer) {
            mainContainer.style.height = `auto`;
        }
    }, [uploadedImages, text]);

    const handleInputChange = (e) => {
        setText(e.target.value);
    };

    useEffect(() => {
        setTokenCount(text.length + 100 * uploadedImages.length);
        // Update the display/UI accordingly
    }, [text]);

    
    let cameraWindow = null; 

    const handleImageSelect = (e) => {
        const files = e.target.files;
        if (files) {
            const fileArray = Array.from(files).map((file) => URL.createObjectURL(file));
            setUploadedImages((prevImages) => [...prevImages, ...fileArray]);
        }
    };

    const openCameraWindow = () => {
        cameraWindow = window.open('', 'cameraWindow', 'width=640,height=480'); // Open a new window
        cameraWindow.document.body.style.backgroundColor = 'black'; // Set background color of the new window to black
        cameraWindow.document.title = 'Camera'; // Set window title
        cameraWindow.document.body.appendChild(videoRef.current); // Append the video element to the new window
    };

    const handleCameraCapture = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = mediaStream;
                openCameraWindow(); // Open the new window when the camera is accessed
            }
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };

    const handleCameraCapture2 = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            const videoElement = document.createElement('video');
            videoElement.srcObject = mediaStream;
            videoElement.play();

            const canvas = document.createElement('canvas');
            canvas.width = videoElement.videoWidth;
            canvas.height = videoElement.videoHeight;

            const context = canvas.getContext('2d');
            context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            const imageDataUrl = canvas.toDataURL('image/png');

            console.log('Captured image data URL:', imageDataUrl);
            // Perform any action with the captured image data URL
        } catch (error) {
            console.error('Error accessing camera:', error);
        }
    };
      
    return (
    <div className="main_container">
        <div className="temp_text_container">
            <textarea
          
            className="text_container_text"
            value={text}
            onChange={handleInputChange}
            placeholder="Start typing..."
            />
        </div>
        {/* <div className="text_container">
            <input
            type="text"
            className="text_container_text"
            value={text}
            onChange={handleInputChange}
            placeholder="Start typing..."
            />
        </div> */}
        <div className="image_preview_container">
                {uploadedImages.map((imageSrc, index) => (
                    <div key={index} className="image_preview" style={{ width: '50%', margin: '0 auto' }}>
                        <img src={imageSrc} alt={`Uploaded image ${index + 1}`} />
                    </div>
                ))}
        </div>        
        <div className="icon_container">
            <div className="tokens_remaining">
                {tokenCount}/12888 
            </div>
            <div className="bottom_icon_positioning">
                <Image src={cameraIcon} alt="camera" className="icon" onClick={handleCameraCapture} />
                {/* <video ref={videoRef} autoPlay muted style={{ display: 'none' }} /> */}
                {/* <label htmlFor="cameraInput">
                            <Image src={cameraIcon} alt="camera" className="icon" />
                        </label>
                        <input
                            type="file"
                            id="cameraInput"
                            accept="image/*"
                            capture="environment"
                            style={{ display: "none" }}
                            onChange={handleImageSelect}
                        />  */}
            </div>
            <div className="bottom_icon_positioning">               
                <label htmlFor="imageInput">
                            <Image src={imageIcon} alt="upload image" className="icon" />
                        </label>
                        <input
                            type="file"
                            id="imageInput"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={handleImageSelect}
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