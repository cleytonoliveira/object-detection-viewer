"use client";

import { useEffect, useState } from "react";
import api from "@/infra/api";

interface Prediction {
  class_name: string;
  confidence: number;
}

export default function PredictionTable() {
  const [predictions, setPredictions] = useState<Prediction[]>([]);

  useEffect(() => {
    async function fetchPredictions() {
      try {
        const response = await api.get("/predictions");
        setPredictions(response.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchPredictions();
  }, []);

  return (
    <div>
      <h2>Last 10 Predictions</h2>
      <table>
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Confidence</th>
          </tr>
        </thead>
        <tbody>
          {predictions.map((prediction, index) => (
            <tr key={index}>
              <td>{prediction.class_name}</td>
              <td>{(prediction.confidence * 100).toFixed(2)} %</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
