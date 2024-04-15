"use client";
import { useRef } from "react";

export default function VideoPlayer() {
  const videoRef = useRef<HTMLVideoElement>(null);

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }

  return (
    <video
      ref={videoRef}
      width="640"
      height="360"
      controls
      onCanPlay={handlePlay}
    >
      <source
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        type="video/mp4"
      />
      <p>Sorry, your browser does not support embedded videos.</p>
    </video>
  );
}
