"use client";

import React, { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
const Plyr = dynamic(() => import("plyr-react"), { ssr: false });
const { APITypes, PlyrInstance, PlyrProps, usePlyr } = Plyr;
import "plyr/dist/plyr.css";

// const BeatPlayer = () => {
//   const { source, options = null } = props;

//   const raptorRef = usePlyr(ref, {
//     source,
//     options,
//   })

//   return <audio ref={raptorRef} className="plyr-react plyr" {...rest} />

//   // playerRef.current.plyr.on("play", () => {
//   //   console.log("Playing some shit")
//   // })

//   return (
//     <div onContextMenu={(e) => e.preventDefault()}>
//       <Plyr ref={playerRef} {...plyrProps} />
//     </div>
//   );
// };

const BeatPlyrComponent = ({ beatName }) => {
  const ref = React.useRef<APITypes>(null);

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

  const raptorRef = usePlyr(ref, {
    source: plyrProps.source,
    options: plyrProps.options
  });

  
  return <audio ref={raptorRef} className="plyr-react plyr" {...rest} />;

  // return (
  //   <div className="wrapper">
  //       <BeatPlayer
  //         ref={ref}
  //         options={plyrProps}
  //       />
  //   </div>
  // );
};

export default BeatPlyrComponent;
