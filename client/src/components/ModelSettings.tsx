"use client";
import { useState } from "react";

interface ModelSettingsProps {
  onSettingsSubmit: (confidence: number, iou: number) => void;
}

export default function ModelSettings({
  onSettingsSubmit,
}: ModelSettingsProps) {
  const [confidence, setConfidence] = useState(0.7);
  const [iou, setIoU] = useState(0.5);

  const handleConfidenceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setConfidence(value);
  };

  const handleIoUChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    setIoU(value);
  };

  const handleSubmit = () => {
    onSettingsSubmit(confidence, iou);
  };

  return (
    <div>
      <h2>Model Settings</h2>
      <div>
        <label htmlFor="confidenceInput">Confidence Threshold:</label>
        <input
          type="number"
          id="confidenceInput"
          value={confidence}
          step={0.1}
          min={0}
          max={1}
          onChange={handleConfidenceChange}
        />
      </div>
      <div>
        <label htmlFor="iouInput">IoU Threshold:</label>
        <input
          type="number"
          id="iouInput"
          value={iou}
          step={0.1}
          min={0}
          max={1}
          onChange={handleIoUChange}
        />
      </div>
      <button onClick={handleSubmit}>Apply Settings</button>
    </div>
  );
}
