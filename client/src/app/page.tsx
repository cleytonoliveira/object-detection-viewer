"use client";
import HealthCheck from "@/components/HealthCheck";
import ModelSettings from "@/components/ModelSettings";
import VideoPlayer from "@/components/VideoPlayer";

export default function Home() {
  function handleSettingsSubmit(confidence: number, iou: number) {
    console.log(`Confidence: ${confidence}, IoU: ${iou}`);
  }

  return (
    <main>
      <header>
        <h1>Object Detection Dashboard</h1>
      </header>
      <section>
        <VideoPlayer />
        <HealthCheck />
        <ModelSettings onSettingsSubmit={handleSettingsSubmit} />
      </section>
      <footer>
        <p>Copyright Cleyton Oliveira © 2024</p>
      </footer>
    </main>
  );
}
