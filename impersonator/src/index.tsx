import React from "react";
import ReactDOM from "react-dom/client";
import { AudioRecorder } from 'react-audio-voice-recorder';

const uploadAudio = (blob: any) => {
  console.log("starting upload")
  const formData = new FormData();
  formData.append("file", blob, "file.webm");

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "https://e15c-12-7-77-162.ngrok-free.app/", true);

  xhr.onload = function () {
    if (xhr.status === 200) {
      console.log("Upload successful:", xhr.responseText);
    } else {
      console.error("Upload failed:", xhr.status, xhr.statusText);
    }
  };

  xhr.onerror = function () {
    console.error("Request failed");
  };

  xhr.send(formData);
};

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <AudioRecorder 
      onRecordingComplete={uploadAudio}
      audioTrackConstraints={{
        noiseSuppression: true,
        echoCancellation: true,
      }} 
      downloadOnSavePress={false}
      downloadFileExtension="mp3"
      showVisualizer={true}
    />
  </React.StrictMode>
);