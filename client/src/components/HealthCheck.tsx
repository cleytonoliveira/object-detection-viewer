"use client";
import { useEffect } from "react";
import { useModel } from "@/context/ModelContext";

export default function HealthCheck() {
  const { healthCheck, handleHealthCheckModel } = useModel();

  useEffect(() => {
    handleHealthCheckModel();
  }, []);

  return (
    <div>
      <h2>Model Status</h2>
      <p>{healthCheck}</p>
    </div>
  );
}
