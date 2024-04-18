"use client";
import { useModel } from "@/context/ModelContext";

export default function LoadModel() {
  const { model, setModel, loadModel, handleHealthCheckModel } = useModel();

  async function handleModel() {
    const newModel = model === "yolov8s" ? "yolov8n" : "yolov8s";
    setModel(newModel);

    try {
      await loadModel(newModel);
      await handleHealthCheckModel();
    } catch (error) {
      console.error("Error loading model:", error);
      setModel(model);
    }
  }

  return (
    <div>
      <h2>Current model:</h2>
      <p>{model}</p>
      {model === "yolov8s" ? (
        <p>Nano, faster and less accurate</p>
      ) : (
        <p>Small, slower and more accurate</p>
      )}
      <button onClick={handleModel}>Change model</button>
    </div>
  );
}
