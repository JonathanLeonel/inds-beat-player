"use client";

import React, { use, useCallback, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
// const Plyr = dynamic(() => import("plyr"), { ssr: false });
// import Plyr from "plyr-react";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
import "plyr/dist/plyr.css";

const BeatPlayer = ({ beatName, handleInit }) => {
    // const ref = useRef();
    // const [reference, setReference] = useState(

    const setRef = useCallback((ref) => {
      // console.log("JK: useCallback interno")
      // ref && console.log(ref)
      // setTimeout(() => {
      if (ref != null && ref.plyr != undefined && ref.plyr != null && ref.plyr.on != undefined) {
        handleInit(ref.plyr, beatName)
      }
      // ref && ref.plyr && 
      // }, 500)
    }, [])

    // useEffect(() => {
    //   console.log("JK: Use effect interno")
    //   console.log(ref.current)
    //   // setTimeout(() => {
    //   ref.current && handleInit(ref.current.plyr, beatName)
    //   // }, 500)
    // }, [])

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
      <Plyr ref={setRef} {...plyrProps} />
    </div>
  );
};

export default BeatPlayer;
