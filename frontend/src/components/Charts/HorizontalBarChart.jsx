import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const HorizontalBarChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext("2d");

    // Check if the chart instance already exists
    if (chartInstance.current !== null) {
      chartInstance.current.destroy();
    }

    // Create a new charst instance and store it in chartInstance
    chartInstance.current = new Chart(ctx, {
      type: "bar",
      data: {
        labels: [
          "Battery",
          "Sound Quality",
          "Display",
          "Camera",
          "Performance",
        ],
        datasets: [
          {
            label: "count",
            data: [8, 6, 5, 7, 4],
            backgroundColor: "#50ADCC",
            borderWidth: 0,
          },
        ],
      },
      options: {
        responsive: true,
        indexAxis: "y",
        scales: {
          x: {
            ticks: {
              color: "#EDF1F4",
            },
          },
          y: {
            ticks: {
              color: "#EDF1F4",
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#EDF1F4",
            },
          },
        },
      },
    });

    return () => {
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
      <canvas ref={chartRef}/>
  );
};

export default HorizontalBarChart;
