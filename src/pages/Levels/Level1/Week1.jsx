import { useState, useEffect } from 'react';
import { FaPlay, FaPause, FaMusic } from 'react-icons/fa';

const GreetingsLesson = () => {
  const [playingAudio, setPlayingAudio] = useState(null);
  const [currentSong, setCurrentSong] = useState(null);

  // Greeting phrases with images
  const greetings = [
    { 
      phrase: "Hello!", 
      audio: "/Audios/hello.mp3",
      image: "/Images/hello.jpg"
    },
    { 
      phrase: "Goodbye!", 
      audio: "/Audios/goodbye.mp3",
      image: "/Images/goodbye.jpg"
    },
    { 
      phrase: "My name is...", 
      audio: "/Audios/name.mp3",
      image: "/Images/name.jpg"
    },
    { 
      phrase: "How are you?", 
      audio: "/Audios/how-are-you.mp3",
      image: "/Images/how-are-you.jpg"
    },
  ];

  // Song paths
  const songs = {
    helloSong: "/Audios/hello-song.mp3",
    happySong: "/Audios/happy-song.mp3",
  };

  const playAudio = (audioPath) => {
    if (playingAudio) {
      playingAudio.pause();
    }
    const newAudio = new Audio(audioPath);
    newAudio.play();
    setPlayingAudio(newAudio);
  };

  const playSong = (songPath) => {
    if (currentSong) {
      currentSong.pause();
      setCurrentSong(null);
    } else {
      const newSong = new Audio(songPath);
      newSong.play();
      setCurrentSong(newSong);
    }
  };

  useEffect(() => {
    return () => {
      if (playingAudio) playingAudio.pause();
      if (currentSong) currentSong.pause();
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-8">
      <h1 className="text-2xl font-bold text-center mb-8 text-purple-600">
        Let's Learn Greetings! 🌟
      </h1>

      <div className="flex flex-wrap gap-2 " >
  {greetings.map((greeting, index) => (
    <div
      key={index}
      className="flex-1 bg-white rounded-2xl p-8 shadow-xl hover:shadow-2xl transition-shadow flex flex-col items-center min-h-[400px] w-full max-w-lg mx-auto"
    >
      <img 
        src={greeting.image}
        alt={greeting.phrase}
        className="w-200 h"
      />
      <p className="  gap-2 text-4xl mb-8 text-center">{greeting.phrase}</p>
      <button
        onClick={() => playAudio(greeting.audio)}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white py-4 rounded-xl flex items-center justify-center text-xl"
      >
        <FaPlay className="mr-3 text-2xl" /> Say It!
      </button>
    </div>
  ))}
</div>
      <div className="max-w-2xl mx-auto space-y-4">
        <h2 className="text-3xl font-semibold text-center mb-6 text-pink-600">
          Sing Along! 🎵
        </h2>

        <div className="bg-yellow-50 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">"Hello Song"</h3>
              <p className="text-gray-600">Hello, hello, how are you today? 🎶</p>
            </div>
            <button
              onClick={() => playSong(songs.helloSong)}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
            >
              {currentSong?.src.endsWith(songs.helloSong) ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>

        <div className="bg-orange-50 p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">"If You're Happy and You Know It"</h3>
              <p className="text-gray-600">Clap your hands! 👏🎶</p>
            </div>
            <button
              onClick={() => playSong(songs.happySong)}
              className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full"
            >
              {currentSong?.src.endsWith(songs.happySong) ? <FaPause /> : <FaPlay />}
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-gray-500">
        <FaMusic className="inline-block mr-2" />
        Click the buttons to hear sounds and songs!
      </div>
    </div>
  );
};

export default GreetingsLesson;