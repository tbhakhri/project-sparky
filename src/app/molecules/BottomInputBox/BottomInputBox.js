'use client';

import './BottomInputBox.css'
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';


export default function BottomInputBox() {
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

    const openCameraWindow = (mediaStream) => {
        cameraWindow = window.open('', 'cameraWindow', 'width=640,height=480');
        if (cameraWindow) {
            cameraWindow.document.title = 'Camera';
            cameraWindow.document.body.style.backgroundColor = 'black';
    
            // Create a new video element in the new window
            const videoElement = cameraWindow.document.createElement('video');
            videoElement.autoplay = true;
            videoElement.style.maxWidth = '100%';
            videoElement.style.height = 'auto';
    
            // Set the media stream to the new video element
            videoElement.srcObject = mediaStream;
            videoElement.onloadedmetadata = () => { videoElement.play(); };
    
            // Append the new video element to the new window's body
            cameraWindow.document.body.appendChild(videoElement);
        }
    };

    const handleCameraCapture = async () => {
        try {
            const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
            
            console.log(mediaStream);
            
            openCameraWindow(mediaStream); // Pass the media stream directly
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
                        <Image src={imageSrc} alt={`Uploaded image ${index + 1}`} />
                    </div>
                ))}
        </div>        
        <div className="icon_container">
            <div className="tokens_remaining">
                {tokenCount}/12888 
            </div>
            <div className="bottom_icon_positioning">
                <Image src="/camera.svg" alt="camera" className="icon" onClick={handleCameraCapture} width={10} height={10}/>
                {/* <video ref={videoRef} autoPlay muted style={{ display: 'none' }} /> */}
                {/* <label htmlFor="cameraInput">
                            <Image   src={cameraIcon} alt="camera" className="icon" />
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
                            <Image src="/imageLibrary.svg" alt="upload image" className="icon" width={10} height={10}/>
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
                    src="/microphone.svg" 
                    alt="microphone"
                    className="icon"
                    width={10} height={10}
                />
            </div>
        </div>    
    </div>
    );
}