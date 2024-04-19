"use client";
import { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";
import api from "@/infra/api";
import { useModel } from "@/context/ModelContext";

interface VideoPlayerProps {
  confidence: number;
  iou: number;
}

export default function VideoPlayer({ confidence, iou }: VideoPlayerProps) {
  const [videoUrl, setVideoUrl] = useState<string | null>("");
  const [fabricCanvas, setFabricCanvas] = useState<fabric.Canvas | null>(null);
  const [objects, setObjects] = useState<any[]>([]);
  const { model, loadModel } = useModel();

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

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
    videoRef.current && videoRef.current.play();
  }

  function handlePause() {
    videoRef.current && videoRef.current.pause();
  }

  useEffect(() => {
    let intervalFrame: NodeJS.Timeout;

    async function objectDetect() {
      await loadModel(model);
      intervalFrame = setInterval(async () => {
        if (videoRef.current && canvasRef.current) {
          const canvas = canvasRef.current;
          const video = videoRef.current;

          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;

          const context = canvas.getContext("2d");
          if (context) {
            context.drawImage(video, 0, 0, canvas.width, canvas.height);

            const frameVideoUrl = canvas
              .toDataURL("image/jpeg")
              .replace("data:image/jpeg;base64,", "");

            try {
              const response = await api.post("/detect", {
                image_path: frameVideoUrl,
                confidence: confidence,
                iou: iou,
              });

              setObjects(response.data);
            } catch (error) {
              console.error("Error detecting objects:", error);
            }
          }
        }
      }, 500);
    }

    if (!fabricCanvas && canvasRef.current) {
      const canvas = new fabric.Canvas(canvasRef.current);
      setFabricCanvas(canvas);
    }

    objectDetect();

    function drawObjects() {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const context = canvas.getContext("2d");

      if (context) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        objects.forEach((object: any) => {
          const {
            box: { height, left, top, width },
            class_name,
            confidence,
          } = object;
          context.beginPath();
          context.font = "16px Arial";
          context.fillStyle = "red";
          context.rect(left, top, width, height);
          context.strokeStyle = "red";
          context.fillText(
            `${class_name} - ${(confidence * 100).toFixed(2)}%`,
            left,
            top - 5
          );
          context.lineWidth = 2;
          context.stroke();
        });
      }
    }

    if (objects.length > 0) {
      drawObjects();
    }

    return () => {
      clearInterval(intervalFrame);
    };
  }, [fabricCanvas, objects]);

  function previousFrame() {
    if (videoRef.current) {
      videoRef.current.currentTime -= 1;
    }
  }

  function forwardFrame() {
    if (videoRef.current) {
      videoRef.current.currentTime += 1;
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
          <video
            ref={videoRef}
            width="640"
            height="480"
            controls
            // onCanPlay={handlePlay}
          >
            <source src={videoUrl} type="video/mp4" />
            <p>Sorry, your browser does not support embedded videos.</p>
          </video>
          <canvas ref={canvasRef} />
        </>
      )}
      <button onClick={handlePlay}>Play</button>
      <button onClick={handlePause}>Pause</button>
      <button onClick={previousFrame}>Anterior</button>
      <button onClick={forwardFrame}>Próximo</button>
    </>
  );
}
