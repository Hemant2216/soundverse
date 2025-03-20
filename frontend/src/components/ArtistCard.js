"use client";
import { useState } from "react";
import PlayButton from "./PlayButton";

export default function ArtistCard({ artist }) {
  const [hovered, setHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = (status) => {
    setIsPlaying(status);
  };

  return (
    <div
      className={`relative p-4 rounded-lg transition-all duration-300 cursor-pointer ${
        hovered || isPlaying ? "bg-gray-800" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      
      <div className="relative w-full h-52">
        <img
          src={artist.image_url}
          alt={artist.name}
          className="rounded-lg w-full h-full object-cover"
        />

        <div
          className={`absolute inset-0 bg-black/50 flex flex-col justify-center items-center rounded-lg transition-opacity duration-300 ${
            hovered || isPlaying ? "opacity-100" : "opacity-0"
          }`}
        >
       
          {artist.audio_url && (
            <div className="top-4 right-4">
              <PlayButton audioSrc={artist.audio_url} onPlay={handlePlay} />
            </div>
          )}
        </div>

        <div
          className={`absolute bottom-2 left-2 flex flex-wrap gap-2 w-fit transition-opacity duration-30 ${
            hovered || isPlaying ? "opacity-0" : "opacity-100"
          }`}
        >
          {[artist.genre, artist.gen1, artist.gen2].filter(Boolean).map((genre, index) => (
            <span
              key={index}
              className="px-2 py-1 flex items-center justify-center rounded-full text-white font-semibold text-xs bg-white/10 backdrop-blur-md shadow-inner"
            >
              {genre}
            </span>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-semibold mt-4">{artist.name}</h3>
      <p className="text-sm text-gray-400">{artist.description}</p>

      <button 
        className={`mt-4 w-full bg-[#6B4DEC] text-white px-4 py-2 rounded-full text-sm font-semibold transition-opacity duration-300 cursor-pointer ${
          hovered || isPlaying ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        <nobr>SUBSCRIBE TO GENERATE</nobr>
      </button>
    </div>
  );
}
