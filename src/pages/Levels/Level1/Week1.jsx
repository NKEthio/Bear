  
// You are an expert English tutor and react web developer. help me create Week1.jsx that has interactive design,quality content, consisting of games and primary for kids(Aged 3-4) on the scope of the following
// **Greetings and Introductions**  
// - Hello, goodbye, my name is, how are you?  
// - Songs: "Hello Song," "If You're Happy and You Know It."

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const greetings = [
  { text: "Hello!", audio: "/Audios/hello.mp3" },
  { text: "Goodbye!", audio: "/Audios/goodbye.mp3" },
  { text: "My name is...", audio: "/Audios/mynameis.mp3" },
  { text: "How are you?", audio: "/Audios/howareyou.mp3" },
];

const songs = [
  { title: "Hello Song", audio: "/Audios/hello_song.mp3" },
  { title: "If You're Happy and You Know It", audio: "/Audios/happy.mp3" },
];

export default function Week1() {
  const [playing, setPlaying] = useState(null);

  const playAudio = (src) => {
    const audio = new Audio(src);
    setPlaying(audio);
    audio.play();
    audio.onended = () => setPlaying(null);
  };

  return (
    <div className="flex flex-col items-center p-6 space-y-6 bg-blue-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center text-blue-600">Greetings and Introductions</h1>
      
      <div className="grid grid-cols-2 gap-4">
        {greetings.map((greet, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.9 }}
            className="p-4 bg-white rounded-xl shadow-lg text-center cursor-pointer"
            onClick={() => playAudio(greet.audio)}
          >
            <p className="text-xl font-semibold">{greet.text}</p>
          </motion.div>
        ))}
      </div>
      
      <h2 className="text-2xl font-bold text-blue-500">Songs</h2>
      <div className="flex flex-col items-center space-y-4">
        {songs.map((song, index) => (
          <Button
            key={index}
            onClick={() => playAudio(song.audio)}
            className="text-lg px-6 py-3 bg-green-500 hover:bg-green-600 text-white rounded-xl"
          >
            {song.title}
          </Button>
        ))}
      </div>
    </div>
  );
}
