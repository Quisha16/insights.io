
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const DoughnutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/sentiment_prediction/');
      const responseData = await response.json();
      const [labels, data]=[Object.keys(responseData.prediction_data), Object.values(responseData.prediction_data)];

      const ctx = chartRef.current.getContext('2d');
      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // Destroy the previous Chart instance
      }

      const ctx2 = chartRef.current.getContext("2d");
      const gradient1 = ctx2.createLinearGradient(0, 0, 0, 400); // Define the gradient along the Y-axis
      gradient1.addColorStop(0, "rgba(108, 34, 166, 1)"); // Start color
      gradient1.addColorStop(1, "rgba(135, 108, 223, 0)");
      const gradient2 = ctx2.createLinearGradient(0, 0, 0, 400); // Define the gradient along the Y-axis
      gradient2.addColorStop(0, "rgba(0, 121, 231, 1)"); // Start color
      gradient2.addColorStop(1, "rgba(73, 33, 236, 0)"); // End color (transparent)


      chartInstance.current = new Chart(ctx, {
        type: 'doughnut', 
        data: {
          labels: ["Negative Sentiment","Positive Sentiment"],
          datasets: [{
            label: ' Reviews',
            data: data,
            backgroundColor: [
              gradient1, // positive reviews
              gradient2, // negative reviews
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'bottom',
              labels: {
                color: '#EDF1F4', // Set legend label color
                font:{
                  size: 12,
                  family: "Nanum Gothic Coding",
                }
              }
            },
            tooltip: {
              enabled: true,
              backgroundColor: "rgba(0, 0, 0, 0.7)", // Background color of the tooltip
              titleFont: {
                family: "Nanum Gothic Coding",
                size: 14,
                weight: "700",
                color: "#EDF1F4", // Font color of the tooltip title
              },
              bodyFont: {
                family: "Nanum Gothic Coding",
                size: 12,
                weight: "400",
                color: "#EDF1F4", // Font color of the tooltip body
              },
            },
          }
        }
      });

      return () => {
        if (chartInstance.current !== null) {
          chartInstance.current.destroy(); // Cleanup on component unmount
        }
      };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
      <canvas ref={chartRef} /> 
  );
};

export default DoughnutChart;