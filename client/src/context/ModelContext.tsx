import api from "@/infra/api";
import { createContext, useContext, useState } from "react";

interface ModelContextProps {
  model: "yolov8s" | "yolov8n";
  setModel: React.Dispatch<React.SetStateAction<"yolov8s" | "yolov8n">>;
  loadModel: (modelName: "yolov8s" | "yolov8n") => Promise<void>;
  healthCheck: string;
  handleHealthCheckModel: () => Promise<void>;
}

const ModelContext = createContext<ModelContextProps | undefined>(undefined);

export function ModelProvider({ children }: { children: React.ReactNode }) {
  const [model, setModel] = useState<"yolov8s" | "yolov8n">("yolov8s");
  const [healthCheck, setHealthCheck] = useState<string>("");

  async function loadModel(modelName: "yolov8s" | "yolov8n") {
    try {
      await api.post("/load_model", {
        model_name: modelName,
      });
    } catch (error) {
      console.error("Error loading model:", error);
    }
  }

  async function handleHealthCheckModel() {
    try {
      const response = await api.get("/health_check");
      setHealthCheck(response.data);
    } catch (error) {
      console.error("Error checking health:", error);
      setHealthCheck("Error checking health.");
    }
  }

  return (
    <ModelContext.Provider
      value={{
        model,
        setModel,
        loadModel,
        healthCheck,
        handleHealthCheckModel,
      }}
    >
      {children}
    </ModelContext.Provider>
  );
}

export function useModel() {
  const context = useContext(ModelContext);
  if (!context) {
    throw new Error("useModel must be used within a ModelProvider");
  }

  return context;
}
