// frontend/src/App.jsx
"use client";
import React, { useEffect, useState } from "react";
import BeatPlayer from "../components/BeatPlayer";

function App() {
  const [beats, setBeats] = useState([]);

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

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-3xl font-bold mb-4">Mi Portfolio de Beats</h1>
      <button onClick={handleUpdate}>Actualizar</button>
      {beats.map((beat) => (
        <div key={beat} className="rounded-xl shadow-md p-4 bg-white">
          <h2 className="text-xl font-semibold mb-2">{beat}</h2>
          <BeatPlayer beatName={beat} />
        </div>
      ))}
    </div>
  );
}

export default App;
