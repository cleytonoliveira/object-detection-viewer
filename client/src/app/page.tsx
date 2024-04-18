"use client";
import HealthCheck from "@/components/HealthCheck";
import LoadModel from "@/components/LoadModel";
import ModelSettings from "@/components/ModelSettings";
import VideoPlayer from "@/components/VideoPlayer";
import { ModelProvider } from "@/context/ModelContext";
import { useState } from "react";

export default function Home() {
  const [confidence, setConfidence] = useState(0.7);
  const [iou, setIoU] = useState(0.5);

  function handleSettingsSubmit(confidence: number, iou: number) {
    setConfidence(confidence);
    setIoU(iou);
  }

  return (
    <main>
      <header>
        <h1>Object Detection Dashboard</h1>
      </header>
      <section>
        <ModelProvider>
          <VideoPlayer confidence={confidence} iou={iou} />
          <LoadModel />
          <HealthCheck />
        </ModelProvider>
        <ModelSettings onSettingsSubmit={handleSettingsSubmit} />
      </section>
      <footer>
        <p>Copyright Cleyton Oliveira © 2024</p>
      </footer>
    </main>
  );
}
