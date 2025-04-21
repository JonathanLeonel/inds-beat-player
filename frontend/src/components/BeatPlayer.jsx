"use client";

import React, { use, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr/dist/plyr.css";

const BeatPlayer = ({ beatName, handleInit }) => {

    const setRef = useCallback((ref) => {
      if (ref?.plyr?.on != undefined) {
        handleInit(ref.plyr, beatName)
      }
    }, [])

  const plyrProps = {
    source: {
      type: "audio",
      title: `${beatName}`,
      sources: [
        {
          src: `/api/beat/stream/${beatName}`,
          type: "audio/wav",
        },
      ],
    },
    options: {
      controls: ["play", "current-time", "progress", "duration"],
    },
  };

  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <Plyr ref={setRef} {...plyrProps} style={{"--plyr-font-family": "Bebas Neue"}}/>
    </div>
  );
};

export default BeatPlayer;
