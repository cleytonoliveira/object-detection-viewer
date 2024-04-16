"use client";
import { useEffect, useState } from "react";
import api from "@/infra/api";

export default function HealthCheck() {
  const [healthCheck, setHealthCheck] = useState<string>("");

  async function handleHealthCheck() {
    try {
      const response = await api.get("/health_check");
      setHealthCheck(response.data);
    } catch (error) {
      console.error("Error checking health:", error);
      setHealthCheck("Error checking health.");
    }
  }

  useEffect(() => {
    handleHealthCheck();
  }, []);

  return (
    <div>
      <h2>Status of health check:</h2>
      <p>{healthCheck}</p>
    </div>
  );
}
