"use client"

import "./BottomInputBox.css"
import Image from "next/image"
import React, { useState, useRef, useEffect } from "react"
import { useData } from "%/DataContext"

export default function BottomInputBox() {
  //   const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [text, setText] = useState("")
  const [tokenCount, setTokenCount] = useState(0)
  //   const videoRef = useRef(null);
  const { data, updateData, addImage, deleteImage } = useData()

  useEffect(() => {
    setText(data.currText)
  }, [data.currText])

  useEffect(() => {
    // Automatically adjust main_container based on the number of uploaded images
    const mainContainer = document.querySelector(".main_container")
    if (mainContainer) {
      mainContainer.style.height = `auto`
    }
  }, [data.currImages, text])

  const handleInputChange = (e) => {
    setText(e.target.value)
    updateData({ currText: e.target.value })
  }

  useEffect(() => {
    setTokenCount(text.length + 100 * data.currImages.length)
    // Update the display/UI accordingly
  }, [data.currImages.length, text])

  //   let cameraWindow = null;

  //     const openCameraWindow = (mediaStream) => {
  //         const width = 640;
  //         const height = 480;
  //         const left = (window.screen.width - width) / 2; // Center horizontally
  //         const top = (window.screen.height - height) / 2; // Center vertically

  //         // Construct the features string with position properties
  //         const features = `width=${width},height=${height},left=${left},top=${top}`;

  //        // cameraWindow = window.open('', 'cameraWindow', 'width=640,height=480');
  //        cameraWindow = window.open('', 'cameraWindow', features);

  //         if (cameraWindow) {

  //             cameraWindow.document.title = 'Camera';
  //             cameraWindow.document.body.style.backgroundColor = 'black';

  //             // Create a new video element in the new window
  //             const videoElement = cameraWindow.document.createElement('video');
  //             videoElement.autoplay = true;
  //             videoElement.style.maxWidth = '100%';
  //             videoElement.style.height = 'auto';

  //             // Set the media stream to the new video element
  //             videoElement.srcObject = mediaStream;
  //             videoElement.onloadedmetadata = () => { videoElement.play(); };

  //             // Append the new video element to the new window's body
  //             cameraWindow.document.body.appendChild(videoElement);
  //         }
  //     };

  //     const handleCameraCapture2 = async () => {
  //         try {
  //             const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

  //             const width = 640;
  //             const height = 480;
  //             const left = (window.screen.width - width) / 2;
  //             const top = (window.screen.height - height) / 2;

  //             const features = `width=${width},height=${height},left=${left},top=${top}`;
  //             const cameraWindow = window.open('', 'cameraWindow', features);

  //             if (cameraWindow) {
  //                 cameraWindow.document.title = 'Camera';
  //                 cameraWindow.document.body.style.backgroundColor = 'black';

  //                 const videoElement = cameraWindow.document.createElement('video');
  //                 videoElement.autoplay = true;
  //                 videoElement.style.maxWidth = '100%';
  //                 videoElement.style.height = 'auto';

  //                 videoElement.srcObject = mediaStream;
  //                 videoElement.onloadedmetadata = () => { videoElement.play(); };

  //                 cameraWindow.document.body.appendChild(videoElement);
  //             }
  //         } catch (error) {
  //             console.error('Error accessing camera:', error);
  //         }
  //     };

  //     const handleCameraCapture = async () => {

  //         try {
  //             const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

  //             // Open the camera in a new window with the stream
  //             const cameraWindow = window.open('', 'cameraWindow', 'width=640,height=480');

  //             if (cameraWindow) {
  //                 console.log('CAMERA WINDOW ACTIVE')
  //                 cameraWindow.document.title = 'Capture Image';
  //                 cameraWindow.document.body.style.margin = '0';
  //                 cameraWindow.document.body.style.display = 'flex';
  //                 cameraWindow.document.body.style.justifyContent = 'center';
  //                 cameraWindow.document.body.style.alignItems = 'center';
  //                 cameraWindow.document.body.style.flexDirection = 'column';
  //                 cameraWindow.document.body.style.backgroundColor = 'black';

  //                 // Create and configure the video element
  //                 const videoElement = cameraWindow.document.createElement('video');
  //                 videoElement.autoplay = true;
  //                 videoElement.style.maxWidth = '100px';
  //                 videoElement.style.height = '100px';
  //                 videoElement.srcObject = mediaStream;
  //                 cameraWindow.document.body.appendChild(videoElement);

  //                 // Create and configure the capture button
  //                 const captureButton = cameraWindow.document.createElement('button');
  //                 captureButton.textContent = 'Capture';
  //                 captureButton.style.marginTop = '20px';
  //                 cameraWindow.document.body.appendChild(captureButton);

  //                 // Draw the video frame to canvas and capture the image upon clicking the button
  //                 captureButton.addEventListener('click', () => {
  //                     // Ensure the canvas element is created here to have access to videoElement
  //                     const canvas = document.createElement('canvas');
  //                     canvas.width = 640; // Or videoElement.videoWidth for dynamic sizing
  //                     canvas.height = 480; // Or videoElement.videoHeight
  //                     const context = canvas.getContext('2d');

  //                     // Draw the video frame to the canvas
  //                     context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);

  //                     // Convert canvas to data URL
  //                     const imageDataUrl = canvas.toDataURL('image/png');

  //                     // Update your state with the new image
  //                     setUploadedImages((prevImages) => [...prevImages, imageDataUrl]);

  //                     // Optionally close the camera window immediately after capture
  //                     cameraWindow.close();
  //                 });

  //                 // Close the stream when the window is closed
  //                 cameraWindow.onbeforeunload = () => {
  //                     mediaStream.getTracks().forEach(track => track.stop());
  //                 };
  //             }
  //         } catch (error) {
  //             console.error('Error accessing camera:', error);
  //         }
  //     };

  const handleDeleteImage = (index) => {
    deleteImage(index)
  }

  const handleImageSelect = (e) => {
    const files = e.target.files
    if (files) {
      const fileArray = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      )
      addImage(fileArray[fileArray.length - 1])
    }
  }

  //   const openCameraWindow = (mediaStream) => {
  //     cameraWindow = window.open("", "cameraWindow", "width=640,height=480");
  //     if (cameraWindow) {
  //       cameraWindow.document.title = "Camera";
  //       cameraWindow.document.body.style.backgroundColor = "black";

  //       // Create a new video element in the new window
  //       const videoElement = cameraWindow.document.createElement("video");
  //       videoElement.autoplay = true;
  //       videoElement.style.maxWidth = "100%";
  //       videoElement.style.height = "auto";

  //       // Set the media stream to the new video element
  //       videoElement.srcObject = mediaStream;
  //       videoElement.onloadedmetadata = () => {
  //         videoElement.play();
  //       };

  //       // Append the new video element to the new window's body
  //       cameraWindow.document.body.appendChild(videoElement);
  //     }
  //   };

  //   const handleCameraCapture = async () => {
  //     try {
  //       const mediaStream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //       });

  //       console.log(mediaStream);

  //       openCameraWindow(mediaStream); // Pass the media stream directly
  //     } catch (error) {
  //       console.error("Error accessing camera:", error);
  //     }
  //   };

  //   const handleCameraCapture2 = async () => {
  //     try {
  //       const mediaStream = await navigator.mediaDevices.getUserMedia({
  //         video: true,
  //       });
  //       const videoElement = document.createElement("video");
  //       videoElement.srcObject = mediaStream;
  //       videoElement.play();

  //       const canvas = document.createElement("canvas");
  //       canvas.width = videoElement.videoWidth;
  //       canvas.height = videoElement.videoHeight;

  //       const context = canvas.getContext("2d");
  //       context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
  //       const imageDataUrl = canvas.toDataURL("image/png");

  //       console.log("Captured image data URL:", imageDataUrl);
  //       // Perform any action with the captured image data URL
  //     } catch (error) {
  //       console.error("Error accessing camera:", error);
  //     }
  //   };

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
        {data.currImages.map((imageSrc, index) => (
          <div key={index} className="image_preview">
            <Image
              className="image_preview_img"
              src={imageSrc}
              alt={`Uploaded image ${index + 1}`}
              width={50}
              height={50}
              objectFit="cover"
            />
            <button
              onClick={() => handleDeleteImage(index)}
              className="delete_image_button"
            >
              <Image
                src="/x-button.svg"
                alt={`Delete image ${index + 1}`}
                width={10}
                height={10}
              />
            </button>
          </div>
        ))}
      </div>

      <div className="icon_container">
        <div className="tokens_remaining">{tokenCount}/12888</div>
        <div className="bottom_icon_positioning">
          <Image
            src="/camera.svg"
            alt="camera"
            className="icon"
            width={10}
            height={10}
          />
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
            <Image
              src="/imageLibrary.svg"
              alt="upload image"
              className="icon"
              width={10}
              height={10}
            />
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
            width={10}
            height={10}
          />
        </div>
      </div>
    </div>
  )
}
