"use client";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import api from "@/infra/api";
import PredictionTable from "./PredictionTable";

interface VideoPlayerProps {
  confidence: number;
  iou: number;
}

interface Object {
  box: {
    height: number;
    left: number;
    top: number;
    width: number;
  };
  class_name: string;
  confidence: number;
}

export default function VideoPlayer({ confidence, iou }: VideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>("");
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [detectObjects, setDetectObjects] = useState<Object[]>([]);
  const [isDetect, setIsDetect] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
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

  useEffect(() => {
    fabricCanvas?.clear();
    async function fetchDetectObjects(imagePath: string) {
      try {
        const response = await api.post("/detect", {
          image_path: imagePath,
          confidence: confidence,
          iou: iou,
        });

        setDetectObjects(response.data);
        setIsDetect(false);
        console.log(response.data);
      } catch (error) {
        console.error("Error detecting objects:", error);
      }
    }

    async function handleObjectDetect() {
      if (videoRef.current) {
        const video = new fabric.Image(videoRef.current, {
          width: videoRef.current.width,
          height: videoRef.current.height,
          selectable: false,
        });

        fabricCanvas?.add(video);

        const imageVideoUrl = fabricCanvas?.toDataURL({
          format: "jpeg",
          quality: 1,
        });

        fabricCanvas?.renderAll();

        if (imageVideoUrl && isDetect) {
          await fetchDetectObjects(imageVideoUrl);
        }

        // (video.getElement() as HTMLVideoElement).play();
      }

      fabric.util.requestAnimFrame(function render() {
        fabricCanvas?.renderAll();
        fabric.util.requestAnimFrame(render);
      });
    }

    handleObjectDetect();
  }, [fabricCanvas, isDetect, confidence, iou]);

  useEffect(() => {
    if (videoUrl && videoRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current, {
        width: videoRef.current.width,
        height: videoRef.current.height,
      });

      setFabricCanvas(canvas);
    }
  }, [videoUrl]);

  useEffect(() => {
    function drawObjects() {
      detectObjects.forEach((object) => {
        const { box, class_name, confidence } = object;
        const { left, top, width, height } = box;

        const rect = new fabric.Rect({
          left,
          top,
          width,
          height,
          fill: "transparent",
          stroke: "yellow",
          strokeWidth: 2,
          selectable: false,
        });

        const text = new fabric.Text(
          `${class_name} - ${(confidence * 100).toFixed(2)}%`,
          {
            left: left,
            top: top - 20,
            fontSize: 20,
            fontWeight: "bold",
            fill: "yellow",
            selectable: false,
          }
        );

        fabricCanvas?.add(rect, text);
      });
    }

    fabricCanvas?.renderAll();
    drawObjects();
  }, [fabricCanvas, detectObjects]);

  const fps = 30;
  const frameDuration = 1 / fps;

  function previousFrame() {
    if (videoRef.current) {
      videoRef.current.currentTime -= frameDuration;
      setIsDetect(true);
    }
  }

  function forwardFrame() {
    if (videoRef.current) {
      videoRef.current.currentTime += frameDuration;
      setIsDetect(true);
    }
  }

  function handlePlay() {
    if (videoRef.current) {
      videoRef.current.play();
    }
  }

  function handlePause() {
    if (videoRef.current) {
      videoRef.current.pause();
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
        <>
          <video ref={videoRef} width="1280" height="720" controls muted>
            <source src={videoUrl} type="video/mp4" />
            <p>Sorry, your browser does not support embedded videos.</p>
          </video>
          <canvas ref={canvasRef} />
        </>
      )}
      <button onClick={previousFrame}>Detect Previous Frame</button>
      <button onClick={() => setIsDetect(true)}>Detect this Frame</button>
      <button onClick={forwardFrame}>Detect Next Frame</button>
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <PredictionTable />
    </>
  );
}
