// frontend/src/App.jsx
"use client";
import React, { useEffect, useState, useRef } from "react";
import BeatPlayer from "../components/BeatPlayer";

function App() {
  const [beats, setBeats] = useState([]);
  const playersRef = useRef({})

  useEffect(() => {
    const fetchBeats = async () => {
      const response = await fetch("/api/beat", {
        mode: "cors",
      });
      const jsonResponse = await response.json();
      setBeats(jsonResponse.beats);
    };

    fetchBeats();
  }, []);

  async function handleUpdate() {
    const response = await fetch("/api/beat", {
      mode: "cors",
    });
    const jsonResponse = await response.json();
    setBeats(jsonResponse.beats);
  }  
  
  const handlePlay = (name) => {
    Object.entries(playersRef.current).forEach(([playerName, player]) => {
      if (playerName !== name && player && !player.paused) {
        player.pause();
      }
    });
  };

  const handleInit = (player, name) => {
    playersRef.current[name] = player
    player.on("play", () => handlePlay(name))
  }

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Catálogo beats - Beatmaking Partners</h1>
      <h2 className="text-3xl font-bold mb-4">Industriales Prods</h2>
      {beats.map((beat) => (
        <div key={beat} className="rounded-xl shadow-md p-4 bg-white">
          <h2 className="text-xl font-semibold mb-2">{beat}</h2>
          <BeatPlayer beatName={beat} handleInit={handleInit}/>
        </div>
      ))}
    </div>
  );
}

export default App;
