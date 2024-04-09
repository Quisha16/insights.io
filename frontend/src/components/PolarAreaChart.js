import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../ComponentCSS/charts.css"; // Import the CSS file for styling

const PolarAreaChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/customer_rating/");
      const responseData = await response.json();
      const [labels, data] = [
        Object.keys(responseData.rating_data),
        Object.values(responseData.rating_data),
      ];
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
                "rgba(12, 53, 106, 0.6)", // #0C356A
                "rgba(29, 93, 155, 0.6)", // #1D5D9B
                "rgba(117, 194, 246, 0.6)", // #75C2F6
                "rgba(244, 209, 96, 0.6)", // #F4D160
                "rgba(251, 238, 172, 0.6)", // #FBEEAC
              ],
              borderWidth: 1,
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
                color: "#070F2B",
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
      <canvas ref={chartRef} className="polarChart-canvas" />
    </div>
  );
};

export default PolarAreaChart;
