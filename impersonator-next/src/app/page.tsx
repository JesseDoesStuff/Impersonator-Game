"use client";
import * as React from "react";
import { AudioRecorder } from "react-audio-voice-recorder";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mic,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Trophy,
  Plus,
  Crown,
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

function cosineDistance() {}

export default function App() {
  const uploadAudio = (blob: any) => {
    console.log("starting upload");
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
    setTargetPlayer(players[Math.floor(Math.random() * players.length)]);
  }

  // function incrementCurrentImitator() {
  //   if (currentImitatorIndex + 1 < players.length) {
  //     setCurrentImitatorIndex(currentImitatorIndex + 1)
  //   } else {
  //     roundEnd();
  //   }
  // }

  // function roundEnd() {
  //   for ()
  // }

  const [currentVector, setCurrentVector] = React.useState<any>();
  const [currentRecording, setCurrentRecording] = React.useState<any>();
  const [players, setPlayers] = React.useState<any[]>([]);
  const [targetPlayer, setTargetPlayer] = React.useState<any>();
  const [currentImitatorIndex, setCurrentImitatorIndex] =
    React.useState<any>(-1);

  const [attempts, setAttempts] = React.useState([
    {
      attempter: {
        wins: 2,
        name: "Jesse",
        mp3File: 10010101,
        voiceVector: [1, 2, 3, 4, 5, 500],
      },
      attemptMp3: 1000101,
      attemptVector: [1, 2, 3, 4, 5, 500],
    },
  ]);

  const [inputValue, setInputValue] = React.useState("");

  const onChangeHandler = (event: {
    target: { value: React.SetStateAction<string> };
  }) => {
    setInputValue(event.target.value);
  };

  // Round ends- compare attemptVectors from attempts[] array with voiceVector from targetPlayer
  // Rank the comparisons by similarity and award the highest similarity by adding a win to that player object
  // Clear attempts array and shift targetPlayer to the next player in array

  const addAudioElement = (blob: Blob) => {
    const url = URL.createObjectURL(blob);
    const audio = document.createElement("audio");
    audio.src = url;
    audio.controls = true;
    document.body.appendChild(audio);
  };
  const [isPlaying, setIsPlaying] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(false);
  const [selectedCharacter, setSelectedCharacter] = React.useState<
    string | null
  >(null);

  const characters = [
    {
      id: "1",
      name: "Samuel F",
      avatar: "/placeholder.svg?height=80&width=80",
    },
    { id: "2", name: "Deven", avatar: "/placeholder.svg?height=80&width=80" },
    { id: "3", name: "Ian", avatar: "/placeholder.svg?height=80&width=80" },
    { id: "4", name: "Zach", avatar: "/placeholder.svg?height=80&width=80" },
    { id: "5", name: "Max", avatar: "/placeholder.svg?height=80&width=80" },
    { id: "6", name: "Ruby", avatar: "/placeholder.svg?height=80&width=80" },
  ];

  const leaderboard = [
    {
      rank: 1,
      player: "ImpersoMaster",
      score: 9850,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 2,
      player: "VoiceChanger",
      score: 8720,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 3,
      player: "MimicPro",
      score: 7650,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 4,
      player: "CharacterVoice",
      score: 6540,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 5,
      player: "ImpersonatorKing",
      score: 5430,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 6,
      player: "VoiceArtist",
      score: 4320,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 7,
      player: "MimicMaster",
      score: 3210,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 8,
      player: "VoiceWizard",
      score: 2100,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ];

  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);

  return (
    <div className="min-h-svh bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* Game Title */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
            The Impersonator
          </h1>
          <p className="text-gray-400 mt-2">
            Master the art of voice impersonation
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Game Area */}
          <div className="lg:col-span-2 space-y-6">
            {/* Video Player */}
            <Card className="bg-gray-900 border-gray-800">
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-950 rounded-md overflow-hidden">
                  <video
                    className="w-full h-full object-cover"
                    poster="/placeholder.svg?height=720&width=1280"
                  >
                    <source src="#" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>

                  {/* Video Controls */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 flex items-center gap-3">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={togglePlay}
                    >
                      {isPlaying ? (
                        <Pause className="h-5 w-5" />
                      ) : (
                        <Play className="h-5 w-5" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                      onClick={toggleMute}
                    >
                      {isMuted ? (
                        <VolumeX className="h-5 w-5" />
                      ) : (
                        <Volume2 className="h-5 w-5" />
                      )}
                    </Button>
                    <div className="text-sm ml-2">00:00 / 02:30</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Character Selection */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-xl">
                  Choose a Person to Impersonate
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {characters.map((character) => (
                    <div
                      key={character.id}
                      className={`flex flex-col items-center gap-2 cursor-pointer transition-all p-2 rounded-lg ${
                        selectedCharacter === character.id
                          ? "bg-purple-900/50 ring-2 ring-purple-500"
                          : "hover:bg-gray-800"
                      }`}
                      onClick={() => setSelectedCharacter(character.id)}
                    >
                      <Avatar className="h-16 w-16">
                        <AvatarImage
                          src={"https://github.com/shadcn.png"}
                          alt={character.name}
                        />
                        <AvatarFallback>
                          {character.name.substring(0, 2)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-center">
                        {character.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Current Impersonation */}
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="flex items-center gap-3">
                {[1, 2, 3].map((i) => (
                  <Avatar
                    key={i}
                    className="h-16 w-16 border-2 border-purple-500"
                  >
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Character"
                    />
                    <AvatarFallback>CH</AvatarFallback>
                  </Avatar>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-16 w-16 rounded-full border-dashed"
                    >
                      <Plus className="h-6 w-6" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px] bg-[#101828] rounded-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white">Add User</DialogTitle>
                      <DialogDescription className="text-white">
                        Add a user to the game!
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <Input
                        className="text-white rounded-2xl"
                        type="text"
                        placeholder="Username"
                        onChange={onChangeHandler}
                        value={inputValue}
                      />
                      <DialogClose asChild>
                        <Button
                          className="text-white bg-purple-500 hover:bg-purple-600"
                          onClick={() => {
                            let newPlayer = {
                              wins: 0,
                              name: inputValue,
                              mp3File: currentRecording,
                              voiceVector: currentVector,
                              previousPlayer: false,
                            };
                            setPlayers([...players, newPlayer]);

                            console.log(newPlayer);
                          }}
                        >
                          Add user
                        </Button>
                      </DialogClose>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>

              <AudioRecorder
                onRecordingComplete={uploadAudio}
                audioTrackConstraints={{
                  noiseSuppression: true,
                  echoCancellation: true,
                }}
                downloadOnSavePress={false}
                downloadFileExtension="mp3"
                showVisualizer={true}
                classes={{ AudioRecorderClass: "scale-130 mt-5 mb-5" }}
              />
            </div>
          </div>

          {/* Leaderboard */}
          <div className="lg:col-span-1">
                <Card className="bg-gray-900 border-gray-800">
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Leaderboard
                      </CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-gray-800">
                            <TableHead className="w-12">Rank</TableHead>
                            <TableHead>Player</TableHead>
                            <TableHead className="text-right">Score</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {leaderboard.map((entry) => (
                            <TableRow
                              key={entry.rank}
                              className="border-gray-800"
                            >
                              <TableCell className="font-medium">
                                {entry.rank === 1 ? (
                                  <span className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500/20 text-yellow-500">
                                    <Crown className="h-3 w-3" />
                                  </span>
                                ) : (
                                  entry.rank
                                )}
                              </TableCell>
                              <TableCell>
                                <div className="flex items-center gap-2">
                                  <Avatar className="h-6 w-6">
                                    <AvatarImage
                                      src={entry.avatar}
                                      alt={entry.player}
                                    />
                                    <AvatarFallback>
                                      {entry.player.substring(0, 2)}
                                    </AvatarFallback>
                                  </Avatar>
                                  <span>{entry.player}</span>
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                {entry.score.toLocaleString()}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

// return (
//   <div className='bg-slate-950 flex flex-col items-center justify-center h-screen w-screen'>
//     <h1>
//       {
//         targetPlayer && currentImitatorIndex ? `${players[currentImitatorIndex].name}, imitate ${targetPlayer.name}` : ''
//       }
//     </h1>
//     <div className='flex flex-row gap-6 mb-5'>
//       <Avatar className='AvatarRoot'>
//         <AvatarImage className='AvatarImage' src="https://github.com/shadcn.png" alt="@shadcn" />
//         <AvatarFallback>CN</AvatarFallback>
//       </Avatar>
//       <Avatar className='AvatarRoot'>
//         <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//         <AvatarFallback>CN</AvatarFallback>
//       </Avatar>
//       <Avatar className='AvatarRoot'>
//         <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
//         <AvatarFallback>CN</AvatarFallback>
//       </Avatar>
//   <Dialog>
//   <DialogPortal>
//     <DialogOverlay />
//   </DialogPortal>
//   <DialogTrigger asChild>
//     <Button style={{borderRadius: 25, width: 45, height: 45}}>+</Button>
//   </DialogTrigger>
//   <DialogContent className="sm:max-w-[425px]">
//     <DialogHeader>
//       <DialogTitle>Add User</DialogTitle>
//       <DialogDescription>
//         Add a user to the game!
//       </DialogDescription>
//     </DialogHeader>
//     <div className="grid gap-4 py-4">
//       <Input type="text" placeholder='Username' onChange={onChangeHandler} value={inputValue} />
//       <DialogClose asChild>
//         <Button onClick={() => {
//           let newPlayer = {
//             wins: 0,
//             name: inputValue,
//             mp3File: currentRecording,
//             voiceVector: currentVector,
//             previousPlayer: false
//           }
//           setPlayers([...players, newPlayer])

//           console.log(newPlayer);
//         }}>Add user</Button>
//       </DialogClose>
//     </div>
//   </DialogContent>
// </Dialog>
//     </div>

//     <ul>
//       {players.map((player) => (
//         <li>{player.name}</li>
//       ))}
//     </ul>

//     <button onClick={onGameStart} >Start Game</button>
//     {currentImitatorIndex >= 0 ? <button>Submit/Next Player</button> : <></>}

//   <AudioRecorder
//   onRecordingComplete={uploadAudio}
//   audioTrackConstraints={{
//     noiseSuppression: true,
//     echoCancellation: true,
//   }}
//   downloadOnSavePress={false}
//   downloadFileExtension="mp3"
//   showVisualizer={true}
// />
//     <br />
//   </div>
// );
