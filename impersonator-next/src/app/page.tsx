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
import { Label } from "@/components/ui/label";

function cosineDistance(vec1: number[], vec2: number[]): number {
  if (vec1.length !== vec2.length) {
    console.log(vec1, vec2.length);
    throw new Error("Vectors must have the same length.");
  }

  const dotProduct = vec1.reduce((sum, v, i) => sum + v * vec2[i], 0);
  const magnitude1 = Math.sqrt(vec1.reduce((sum, v) => sum + v * v, 0));
  const magnitude2 = Math.sqrt(vec2.reduce((sum, v) => sum + v * v, 0));

  if (magnitude1 === 0 || magnitude2 === 0) {
    throw new Error("Vectors must not be zero vectors.");
  }

  const cosineSimilarity = dotProduct / (magnitude1 * magnitude2);

  return 1 - cosineSimilarity; // Cosine distance = 1 - Cosine similarity
}

export default function App() {
  const uploadAudio = (blob: any) => {
    setIsRecordingDone(true);
    console.log("starting upload");
    const formData = new FormData();
    formData.append("file", blob, "file.webm");

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "https://api.mortada.dev", true);

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
    setPlayers([
      {
        name: "Owner",
        score: 0,
        mp3File: null,
        voiceVector: null,
      }
    ]);
    // setTargetPlayer(players[Math.floor(Math.random() * players.length)]);
    setSelectedCharacter(characters[0]);
  }

  function incrementCurrentImitator() {
    setIsRecordingDone(false)
    players[currentImitatorIndex].score = cosineDistance(currentVector, selectedCharacter.vector)
    setAttempts([...attempts, {
      attempter: players[currentImitatorIndex],
      attemptMp3: currentRecording,
      attemptVector: currentVector,
    }]) // previous 
    if (currentImitatorIndex + 1 < players.length) {
      setCurrentImitatorIndex(currentImitatorIndex + 1)
    } else {
      setTimeout(roundEnd, 1000)
    }
  }

  const [currentVector, setCurrentVector] = React.useState<any>();
  const [currentRecording, setCurrentRecording] = React.useState<any>();
  const [players, setPlayers] = React.useState<any[]>([]);
  const [currentImitatorIndex, setCurrentImitatorIndex] =
    React.useState<any>(0);
  const [isRecordingDone, setIsRecordingDone] = React.useState(false);
  const audioRef = React.useRef<HTMLAudioElement | null>(null);

  const [attempts, setAttempts] = React.useState<any>([
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
    any
  >({
    id: "1",
    name: "Samuel",
    avatar: "/placeholder.svg?height=80&width=80",
    mp3: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/cce5f0a33fe859e83cbf2fa0dbd976b0ba096d1a_samuel_f_audio.mp4",
  });

  const characters = [
    {
      id: "1",
      name: "Samuel",
      avatar: "/placeholder.svg?height=80&width=80",
      mp3: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/cce5f0a33fe859e83cbf2fa0dbd976b0ba096d1a_samuel_f_audio.mp4",
      vector: [0.0, 0.12841428816318512, 0.001888155355118215, 0.0, 0.0651078149676323, 0.027497505769133568, 0.0764918103814125, 0.11805807799100876, 0.0, 0.0, 0.10779809206724167, 0.02772744745016098, 0.0, 0.0, 0.015740837901830673, 0.0, 0.2158653885126114, 0.12243533879518509, 0.014990480616688728, 0.0009777728701010346, 0.0, 0.10115014761686325, 0.0, 0.0, 0.0, 0.054719094187021255, 0.0, 0.01418962050229311, 0.0, 0.0, 0.2001156359910965, 0.07989837974309921, 0.0, 0.007258412893861532, 0.003409565659239888, 0.060246098786592484, 0.05642731115221977, 0.08135197311639786, 0.002046696376055479, 0.04517468437552452, 0.0, 0.0, 0.032753217965364456, 0.0623013935983181, 0.05879494920372963, 0.0, 0.050399549305438995, 0.015347794629633427, 0.005785373505204916, 0.004442111123353243, 0.0, 0.012062599882483482, 0.0, 0.0, 0.06655090302228928, 0.03521495312452316, 0.0018455779645591974, 0.001252057496458292, 0.0, 0.015582769177854061, 0.021074073389172554, 0.0, 0.0010323241585865617, 0.04719977453351021, 0.12288159132003784, 0.0, 0.12412930279970169, 0.056350842118263245, 0.0, 0.019380813464522362, 0.06457722932100296, 0.06487999111413956, 0.0, 0.13585999608039856, 0.006401717197149992, 0.0025087075773626566, 0.0, 0.07139533013105392, 0.0028174296021461487, 0.0009294481133110821, 0.025917991995811462, 0.0, 0.14618222415447235, 0.00011564865417312831, 0.0, 0.0, 0.017291396856307983, 0.010679789818823338, 0.01926790177822113, 0.07238403707742691, 0.016284283250570297, 0.00282503804191947, 0.0, 0.0, 0.002252852777019143, 0.0, 0.024235079064965248, 0.0, 0.0, 0.0, 0.08861816674470901, 0.0, 0.06316948682069778, 0.08067421615123749, 0.007734984625130892, 0.08437101542949677, 0.04805903509259224, 0.01794855296611786, 0.04280063137412071, 0.2552125155925751, 0.0, 0.010860903188586235, 0.0, 0.18062077462673187, 0.01426779292523861, 0.0, 0.0, 0.014638380147516727, 0.0, 0.0, 0.10262956470251083, 0.01719629392027855, 0.0608442984521389, 0.015138019807636738, 0.04875553026795387, 0.08063429594039917, 0.036187801510095596, 0.08179868757724762, 0.1316259503364563, 0.0, 0.00020819537166971713, 0.0013644344871863723, 0.20159783959388733, 0.11123745143413544, 0.05281028524041176, 0.09782960265874863, 0.0012422169093042612, 0.007090480998158455, 0.0459153987467289, 0.01012360118329525, 0.017339957877993584, 0.04488607123494148, 0.047984980046749115, 0.0048194769769907, 0.04783056303858757, 0.0, 0.11313584446907043, 0.0, 0.08821416646242142, 0.017802003771066666, 0.03348850458860397, 0.028125079348683357, 0.0012815764639526606, 0.004138777498155832, 0.0030697928741574287, 0.19013968110084534, 0.0, 0.0, 0.043680161237716675, 0.002606427064165473, 0.0, 0.0, 0.006935552693903446, 0.00468739029020071, 0.23030784726142883, 0.01875138469040394, 0.07677676528692245, 0.05044909939169884, 0.10607363283634186, 0.04864804819226265, 0.005880098324269056, 0.0, 0.0, 0.01736694574356079, 0.0, 4.5679989852942526e-05, 0.012757065705955029, 0.002106174360960722, 0.0007570132147520781, 0.0379752516746521, 0.08148614317178726, 0.06320187449455261, 0.027836482971906662, 0.006469963118433952, 0.05488031730055809, 0.0, 0.0, 0.0013281472492963076, 0.0035849150735884905, 0.006154919508844614, 0.020574821159243584, 0.020927583798766136, 0.0, 0.1992061287164688, 0.0, 0.005865669809281826, 0.15717199444770813, 0.2010597139596939, 0.0019038538448512554, 0.24876604974269867, 0.0, 0.048747263848781586, 0.05449280887842178, 0.08186259865760803, 0.0, 0.0, 0.0018452664371579885, 0.09217938780784607, 0.039994947612285614, 0.0, 0.0, 0.00033311048173345625, 0.025481024757027626, 0.15384648740291595, 0.09096677601337433, 0.0, 0.0, 0.04757639020681381, 0.04682043567299843, 0.0, 0.05109674483537674, 0.016473207622766495, 0.003105828072875738, 0.0, 0.06443090736865997, 0.013150829821825027, 0.010091600008308887, 0.0029149085748940706, 0.0, 0.0, 0.019219154492020607, 0.0, 0.011921907775104046, 0.0, 0.0, 0.018716532737016678, 0.04219482094049454, 0.0385490357875824, 0.09087245911359787, 0.11183316260576248, 0.07731275260448456, 0.0, 0.09717255085706711, 0.008094429969787598, 0.0, 0.03693937137722969, 0.03731570392847061, 0.0, 0.07595077157020569, 0.003024845151230693, 0.0576048381626606, 0.04604611173272133, 0.0034571525175124407, 0.0, 0.013433696702122688, 0.023379702121019363]
    },
    { id: "2", name: "Deven", avatar: "/placeholder.svg?height=80&width=80", mp3: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/44c6e2661c681c2d90df971f40ffd10049a796db_dev_audio.mp4" },
    { id: "3", name: "Kermit", avatar: "/placeholder.svg?height=80&width=80", mp3: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/09d5ff39fd7db3acedd29bd6486cb2dcc701f185_kermit_audio.mp4" },
    { id: "4", name: "Danny Devito", avatar: "/placeholder.svg?height=80&width=80", mp3: "https://hc-cdn.hel1.your-objectstorage.com/s/v3/bd674f00dd076f0675e7ba42e03f32e31da13919_dannydevito_audio.mp4" }
  ];


  const togglePlay = () => setIsPlaying(!isPlaying);
  const toggleMute = () => setIsMuted(!isMuted);


  function roundEnd() {
    setAttempts([])
  }

  React.useEffect(() => {
    onGameStart();
  }
    , []);

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
            <div className="flex flex-col items-center gap-4">
              <audio
                key={selectedCharacter}
                ref={audioRef}
                controls
                src={selectedCharacter.mp3}>
                Your browser does not support the
                <code>audio</code> element.
              </audio>
            </div>


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
                      className={`flex flex-col items-center gap-2 cursor-pointer transition-all p-2 rounded-lg ${selectedCharacter.name === character.name
                          ? "bg-purple-900/50 ring-2 ring-purple-500"
                          : "hover:bg-gray-800"
                        }`}
                      onClick={() => {
                        setSelectedCharacter(character)
                        console.log(character.name)
                      }

                      }
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

            {/* <h1>{players[currentImitatorIndex].name}, imitate {targetPlayer.name}</h1> */}
            <div className="flex flex-col items-center gap-4 py-6">
              <div className="flex items-center gap-3">
                {players.map((i, index) => (
                  <div className="flex flex-col items-center gap-2">
                    {/* {index == currentImitatorIndex ? "Hi" : <></>} */}
                    <Avatar
                      key={i}
                      className={`h-16 w-16 border-2 ${i.name === players[currentImitatorIndex].name ? "border-purple-500 border-4" : null}`}
                    >
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="Character"
                      />
                      <AvatarFallback>CH</AvatarFallback>
                    </Avatar>
                    <Label>{i.name}</Label>
                  </div>
                ))}
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      size="icon"
                      variant="outline"
                      className="h-16 w-16 rounded-full border-dashed mb-5"
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
                              score: 0,
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
              <div className="flex flex-row items-center gap-3">
                {!isRecordingDone ?
                  <AudioRecorder
                    onRecordingComplete={uploadAudio}
                    audioTrackConstraints={{
                      noiseSuppression: true,
                      echoCancellation: true,
                    }}
                    downloadOnSavePress={false}
                    downloadFileExtension="mp3"
                    showVisualizer={true}
                    classes={{ AudioRecorderClass: "scale-130 mt-5 mb-5 ml-5" }}
                  />
                  :
                  <Button className="ml-5" onClick={incrementCurrentImitator}>{(currentImitatorIndex == players.length - 1) ? "End Game" : "Next Player"}</Button>
                }
              </div>
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
                      {players.map((entry: any, i: any) => (
                        <TableRow
                          key={entry.name}
                          className="border-gray-800"
                        >
                          <TableCell className="font-medium">
                            {i === 0 ? (
                              <span className="flex items-center justify-center h-6 w-6 rounded-full bg-yellow-500/20 text-yellow-500">
                                <Crown className="h-3 w-3" />
                              </span>
                            ) : (
                              i
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-6 w-6">
                                <AvatarImage
                                  src={entry.avatar}
                                  alt={entry.name}
                                />
                                <AvatarFallback>
                                  {entry.name.substring(0, 2)}
                                </AvatarFallback>
                              </Avatar>
                              <span>{entry.name}</span>
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
