"use client";
import { useRef, useState } from "react";

export default function VideoPlayer() {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  function verifyUrl(url: string) {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const inputValue = event.target.value;
    const isValidUrl = verifyUrl(inputValue);

    if (isValidUrl) {
      setVideoUrl(inputValue);
    }

    const file = event.target.files?.[0];
    if (file) {
      const fileUrl = URL.createObjectURL(file);
      setVideoUrl(fileUrl);
    }

    if (videoRef.current) {
      videoRef.current.load();
    }
  }

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video:", error);
      });
    }
  }

  return (
    <>
      <input
        type="text"
        placeholder="Enter the video URL or choose a local video"
        onChange={handleFileChange}
      />
      <input type="file" accept="video/*" onChange={handleFileChange} />
      {videoUrl && (
        <video
          ref={videoRef}
          width="640"
          height="360"
          controls
          onCanPlay={handlePlay}
        >
          <source src={videoUrl} type="video/mp4" />
          <p>Sorry, your browser does not support embedded videos.</p>
        </video>
      )}
    </>
  );
}
