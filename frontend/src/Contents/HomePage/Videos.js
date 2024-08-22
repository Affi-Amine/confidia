import React, { useState, useCallback, useMemo } from "react";
import "../../sass/Contents/HomePage/Videos.scss";

import ReactPlayer from "react-player";
import Manager from "../../assets/videos/Manager.mp4";
import PubData from "../../assets/videos/PubData.mp4";
import PubUser from "../../assets/videos/PubUser.mp4";

function Videos() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const urls = useMemo(() => [Manager, PubData, PubUser], []);
  const playNextVideo = useCallback(() => {
    setCurrentVideoIndex((currentVideoIndex + 1) % urls.length);
  }, [currentVideoIndex, urls.length]);

  return (
    <div className={`Videos ${loading ? "loading" : "loaded"}`}>
      <ReactPlayer
        url={urls[currentVideoIndex]}
        playing={true}
        onReady={() => setLoading(false)}
        onEnded={playNextVideo}
        controls
        muted
        width="100%"
        height="95%"
        className="PlayerVideo"
      />
    </div>
  );
}

export default Videos;
