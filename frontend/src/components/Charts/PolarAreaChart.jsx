import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PolarAreaChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/aspect_modelling/");
      const responseData = await response.json();
      const [labels, data] = [Object.keys(responseData.negative_aspects), Object.values(responseData.negative_aspects)];
      
      const ctx = chartRef.current.getContext("2d");
      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // Destroy the previous Chart instance
      }
      chartInstance.current = new Chart(ctx, {
        type: "polarArea",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Customer Ratings",
              data: data,
              backgroundColor: [
                " #83D4E4",
                "#2D8B9D",
                "#007C8F",
                "#00657A",
                "#50ADCC",
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              display: true,
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
          chartInstance.current.destroy(); // Cleanup on component unmount
        }
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return <canvas ref={chartRef} />;
};

export default PolarAreaChart;
