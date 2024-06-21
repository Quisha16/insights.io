import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

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

      chartInstance.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Positive Sentiment",
              data: data, // Use the data array
              borderColor: "#4399BA", // color for the line
              borderWidth: 2,
              fill: {
                target: "origin",
                above: "#A5E5FB",
              },
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            x: {
              ticks: {
                color: "#EDF1F4", // Set x-axis label color to white
              },
            },
            y: {
              ticks: {
                color: "#EDF1F4", // Set y-axis label color to white
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#EDF1F4", // Set legend label color to white
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
      <canvas ref={chartRef} />
  );
};

export default LineGraph2;
