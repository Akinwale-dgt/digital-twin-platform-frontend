import { Bar } from "react-chartjs-2";
import React from "react";

export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: "center" }}>Cognitive Load</h2>
      <Bar
        data={chartData}
        options={{
           responsive: true,
           minBarLength: '500px',
          maintainAspectRatio: true,
          plugins: {
            title: {
              display: true,
              text: "Cognitive Load"
            },
            legend: {
              display: false
            }
          }
        }}
      />
    </div>
  );
};