"use client";
import { useState, useEffect } from "react";
import { Howl } from "howler";

export default function PlayButton({ audioSrc }) {
  const [playing, setPlaying] = useState(false);
  const [sound, setSound] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (!audioSrc) return;

    const howl = new Howl({
      src: [audioSrc],
      html5: true,
      onload: () => {
        setLoaded(true);
        console.log("Audio loaded successfully");
      },
      onloaderror: (id, error) => {
        console.error("Audio load error:", error, "for URL:", audioSrc);
      },
      onplayerror: (id, error) => {
        console.error("Audio play error:", error);
      }
    });

    setSound(howl);

    return () => {
      howl.unload(); // Cleanup
    };
  }, [audioSrc]);

  const handlePlay = () => {
    if (!sound) {
      console.error("Audio instance not initialized");
      return;
    }
    if (!loaded) {
      console.error("Audio not ready to play. Please check the source URL.");
      return;
    }

    if (playing) {
      sound.pause();
    } else {
      sound.play();
    }
    setPlaying(!playing);
  };

  return (
    <button onClick={handlePlay} className="flex items-center justify-center bg-opacity-50">
      {playing ? (
        <img className="cursor-pointer" src="/Pause.png" alt="Pause Icon" />
      ) : (
        <img className="cursor-pointer" src="/Play.png" alt="Play Icon" />
      )}
    </button>
  );
}
