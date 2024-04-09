import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../ComponentCSS/charts.css";

const LineGraph2 = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/customer_overtime_positive_sentiment/"
      );
      const responseData = await response.json();
      const [labels, data] = [
        Object.keys(responseData.overtime_sentiment_data),
        Object.values(responseData.overtime_sentiment_data),
      ];

      const ctx = chartRef.current.getContext("2d");
      if (chartInstance.current !== null) {
        chartInstance.current.destroy();
      }

      // Create a new chart instance and store it in chartInstance
      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Positive Sentiment",
              data: data, // Use the data array
              borderColor: "#FFC700", // Yellow color for the line
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "#F6F4EB",
              },
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              ticks: {
                color: "#070F2B", // Set x-axis label color to white
              },
            },
            y: {
              ticks: {
                color: "#070F2B", // Set y-axis label color to white
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#070F2B", // Set legend label color to white
              },
            },
          },
        },
      });

      return () => {
        if (chartInstance.current !== null) {
          chartInstance.current.destroy(); // Cleanup on component unmount
        }
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div>
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineGraph2;
