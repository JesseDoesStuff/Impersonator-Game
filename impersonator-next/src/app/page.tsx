"use client"
import * as React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';
import { Button } from "@/components/ui/button"


export default function App() {

  const uploadAudio = (blob: any) => {
    console.log("starting upload")
    const formData = new FormData();
    formData.append("file", blob, "file.webm");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://9d25-12-7-77-162.ngrok-free.app/", true);

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

  const [players, setPlayers] = React.useState<any[]>([])

  const [data, setData] = React.useState({
    targetPlayer: {
      wins: 2,
      name: "Jesse",
      mp3File: 10010101,
      voiceVector: [1, 2, 3, 4, 5, 500]
    },
    attempts: [{
      attempter: {
        wins: 2,
        name: "Jesse",
        mp3File: 10010101,
        voiceVector: [1, 2, 3, 4, 5, 500]
      },
      attemptMp3: 1000101,
      attemptVector: [1, 2, 3, 4, 5, 500]
    }]
  })

  const [inputValue, setInputValue] = React.useState('');

  const onChangeHandler = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setInputValue(event.target.value);
  };


  // Round ends- compare attemptVectors from attempts[] array with voiceVector from targetPlayer
  // Rank the comparisons by similarity and award the highest similarity by adding a win to that player object
  // Clear attempts array and shift targetPlayer to the next player in array


  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement('audio');
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };

  return (
    <div>

      <input type="text" placeholder='Username' onChange={onChangeHandler} value={inputValue}></input>
      <Button onClick={() => {
        let newPlayer = {
          wins: 0,
          name: inputValue,
          mp3File: null,
          voiceVector: null
        }
        setPlayers([...players, newPlayer])
        console.log(newPlayer);
      }}>Add Player</Button>

      <ul>
        {/* {players.map(player) => (
          
        )}         */}
      </ul>

      <AudioRecorder
        onRecordingComplete={uploadAudio}
        audioTrackConstraints={{
          noiseSuppression: true,
          echoCancellation: true,
          // autoGainControl,
          // channelCount,
          // deviceId,
          // groupId,
          // sampleRate,
          // sampleSize,
        }}
        onNotAllowedOrFound={(err) => console.table(err)}
        downloadOnSavePress={true}
        downloadFileExtension="webm"
        mediaRecorderOptions={{
          audioBitsPerSecond: 128000,
        }}
        showVisualizer={true}
      />
      <br />
    </div>
  );
}
