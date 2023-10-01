import React, { useEffect, useRef, useState } from 'react';

const Detection = () => {
  const videoRef = useRef(null);
  let mediaStream = null;

  useEffect(() => {
    const startWebcam = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });

        if (videoRef.current) {
          videoRef.current.srcObject = mediaStream;
        }
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startWebcam();

    // Cleanup function to stop the media stream when component unmounts
    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureAndSendFrames = async () => {
    if (mediaStream) {
      const videoTrack = mediaStream.getVideoTracks()[0];
      const imageCapture = new ImageCapture(videoTrack);

      const frames = [];

      const captureFrame = async () => {
        const blob = await imageCapture.takePhoto();
        frames.push(blob);

        // You can adjust the frame capture frequency as needed
        setTimeout(captureFrame, 100); // Capture a frame every 100ms (adjust as needed)
      };

      // Start capturing frames
      captureFrame();

      // Send frames to the server
      const formData = new FormData();
      frames.forEach((frameBlob, index) => {
        formData.append(`frame${index}`, frameBlob, `frame${index}.jpg`);
      });

      fetch('http://localhost:3001/api/detection', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Response from server:', data);
        })
        .catch((error) => {
          console.error('Error sending frames to server:', error);
        });
    }
  };

  return (
    <div>
      <h1>Detection</h1>
      <div>
        <video ref={videoRef} autoPlay playsInline controls width="640" height="480"></video>
        <button onClick={captureAndSendFrames}>Capture and Send Frames</button>
      </div>
    </div>
  );
};

export default Detection;
