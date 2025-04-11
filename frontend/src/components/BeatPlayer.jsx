"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
// const Plyr = dynamic(() => import("plyr"), { ssr: false });
// import Plyr from "plyr-react";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr/dist/plyr.css";

const BeatPlayer = ({ beatName, onInit }) => {
  //   const playerRef = useRef(null);

  //   useEffect(() => {
  //     const player = new Plyr(playerRef.current, {
  //       controls: true, //["play", "progress", "current-time"],
  //       autoplay: false,
  //       autopause: true,
  //     });

  //     // return () => {
  //     //   player.destroy();
  //     // };
  //   }, [beatName]);

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
      <Plyr {...plyrProps} onInit={onInit} />
      {/* <audio
        ref={playerRef}
        // controls={["play"]}
        // controlsList="play,progress"
        // disableContextMenu
        // controls={playerRef.current?.controls || ""}
        crossOrigin="anonymous"
        src={`/api/beat/stream/${beatName}`}
      /> */}
    </div>
  );
};

export default BeatPlayer;
