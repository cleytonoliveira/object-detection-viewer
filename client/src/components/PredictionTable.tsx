"use client";

import { useEffect, useState } from "react";

export default function PredictionTable() {
  const [predictions, setPredictions] = useState([]);

  useEffect(() => {
    setPredictions([
      { class_name: "person", confidence: 0.9 },
      { class_name: "car", confidence: 0.8 },
      { class_name: "dog", confidence: 0.7 },
      { class_name: "cat", confidence: 0.6 },
      { class_name: "bicycle", confidence: 0.5 },
      { class_name: "motorcycle", confidence: 0.4 },
      { class_name: "bus", confidence: 0.3 },
      { class_name: "truck", confidence: 0.2 },
      { class_name: "traffic light", confidence: 0.1 },
      { class_name: "stop sign", confidence: 0.0 },
    ]);
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
