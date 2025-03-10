import * as React from 'react';
import { AudioRecorder } from 'react-audio-voice-recorder';

function cosineDistance() {

}

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
        setCurrentRecording(blob);
        setCurrentVector(JSON.parse(xhr.responseText).embedding);
      
      } else {
        console.error("Upload failed:", xhr.status, xhr.statusText);
      }
    };
  
    xhr.onerror = function () {
      console.error("Request failed");
    };
  
    xhr.send(formData);
  };

  function onGameStart() {
      setTargetPlayer(players[Math.floor(Math.random()*players.length)])
      
  }

  function incrementCurrentImitator() {
    if (currentImitatorIndex + 1 < players.length) {
      setCurrentImitatorIndex(currentImitatorIndex + 1)
    } else {
      roundEnd();
    }
  }

  function roundEnd() {
    for ()
  }

  const [currentVector, setCurrentVector] = React.useState<any>();
  const [currentRecording, setCurrentRecording] = React.useState<any>();
  const [players, setPlayers] = React.useState<any[]>([])
  const [targetPlayer, setTargetPlayer] = React.useState<any>();
  const [currentImitatorIndex, setCurrentImitatorIndex] = React.useState<any>(-1);

  const [attempts, setAttempts] = React.useState(
    [{
      attempter: {
        wins: 2,
        name: "Jesse",
        mp3File: 10010101,
        voiceVector: [1, 2, 3, 4, 5, 500]
      },
      attemptMp3: 1000101,
      attemptVector: [1, 2, 3, 4, 5, 500]
    }]
  )

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
      <h1>
        {
          targetPlayer && currentImitatorIndex ? `${players[currentImitatorIndex].name}, imitate ${targetPlayer.name}` : ''
        }
      </h1>
      <input type="text" placeholder='Username' onChange={onChangeHandler} value={inputValue} />
      <button onClick={() => {
        let newPlayer = {
          wins: 0,
          name: inputValue,
          mp3File: currentRecording,
          voiceVector: currentVector,
          previousPlayer: false
        }
        setPlayers([...players, newPlayer])

        console.log(newPlayer);
      }}>Add user</button>

      <ul>
        {players.map((player) => (
          <li>{player.name}</li>
        ))}        
      </ul>

      <button onClick={onGameStart} >Start Game</button>
      {currentImitatorIndex >= 0 ? <button>Submit/Next Player</button> : <></>}

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
      <br />
    </div>
  );
}