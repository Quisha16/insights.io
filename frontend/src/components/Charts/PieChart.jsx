import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const PieChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/customer_rating/");
      const responseData = await response.json();
      const labels = Object.keys(responseData.rating_data);
      const data = Object.values(responseData.rating_data);

      const ctx = chartRef.current.getContext("2d");
      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // Destroy the previous Chart instance
      }
      chartInstance.current = new Chart(ctx, {
        type: "pie",
        data: {
          labels: labels,
          datasets: [
            {
              label: " Customer Ratings",
              data: data,
              backgroundColor: [
                "rgba(0, 121, 231, 1)",
                "rgba(82, 145, 211, 1)",
                "rgba(73, 33, 236, 1)",
                "rgba(108, 34, 166, 1)",
                "rgba(135, 108, 223, 1)",
              ],
              borderWidth: 0,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: "bottom",
              labels: {
                color: "#EDF1F4",
                font: {
                  size: 12,
                  family: "Nanum Gothic Coding",
                },
              },
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

export default PieChart;
