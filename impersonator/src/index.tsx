import React from "react";
import ReactDOM from "react-dom/client";
import { AudioRecorder } from 'react-audio-voice-recorder';
import App from "./App";

ReactDOM.createRoot(document.getElementById("root") as Element).render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>
);