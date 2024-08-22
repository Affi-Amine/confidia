import React from "react";
import ReactPlayer from "react-player";
import "../sass/Pages/VideoDemo.scss";
import videoFile from "../assets/videos/Demonstration.mp4";

export default function VideoDemo() {
  return (
    <div className="VideoDemo">
      <ReactPlayer
        url={videoFile}
        controls
        muted
        playing={true}
        width="100%"
        height="95%"
        className="PlayerVideoDemo"
      />
    </div>
  );
}
