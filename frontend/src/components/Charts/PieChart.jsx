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
              label: "Customer Ratings",
              data: data,
              backgroundColor: [
                " #9F88FD",
                "#743ee2",

                "#6346d5",
                "#5b89d8",
                "#1EA8DF",
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
