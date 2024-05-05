import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import moment from "moment";
import "chartjs-adapter-moment"; // This will register the Moment.js adapter with Chart.js
import "../MainContent/MainContent.css";
import ChartDataLabels from "chartjs-plugin-datalabels";

const LineGraph = () => {
  const chartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/customer_overtime_sentiment/"
      );
      const responseData = await response.json();
      const zeroData = responseData.zero_overtime_sentiment_data;
      const oneData = responseData.one_overtime_sentiment_data;
      const labels = [
        ...new Set([...Object.keys(zeroData), ...Object.keys(oneData)]),
      ];
      labels.sort((a, b) => new Date(a) - new Date(b));

      const zeroValues = [];
      const oneValues = [];

      labels.forEach((label) => {
        zeroValues.push(zeroData[label] || 0); // If no data available for label, push 0
        oneValues.push(oneData[label] || 0); // If no data available for label, push 0
      });

      const ctx = chartRef.current.getContext("2d");
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }

      const ctx2 = chartRef.current.getContext("2d");
      const gradient = ctx2.createLinearGradient(0, 0, 0, 400); // Define the gradient along the Y-axis
      gradient.addColorStop(0, "rgba(99, 70, 213, 0.5)"); // Start color
      gradient.addColorStop(1, "rgba(0, 121, 231, 0)"); // End color (transparent)
      lineChartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: " Positive",
              data: oneValues, // Example data for positive sentiment over months
              borderColor: "#9F88FD", // Positive sentiment line color
              pointRadius: 2,
              pointBorderWidth: 1,
              borderWidth: 0,
              backgroundColor: "rgba(159, 136, 253, 0.3)",
              fill: {
                target: "origin",
                above: gradient,
              },
            },
            {
              label: "Negative",
              data: zeroValues, // Example data for negative sentiment over months
              borderColor: "#1EA8DF", // Negative sentiment line color
              pointRadius: 2,
              pointBorderWidth: 1,
              borderWidth: 0,
              backgroundColor: "rgba(0, 121, 231, 0.3)",
              fill: {
                target: "origin",
                above: "rgba(0, 121, 231, 0.5)",
              },
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "Count Of Reviews",
                font: {
                  family: "Nanum Gothic Coding",
                  size: 14,
                  weight: "bold",
                  color: "#EDF1F4",
                },
              },

              ticks: {
                color: "#EDF1F4",
              },

              grid: {
                color: "#1F1D36", // Set color of y-axis gridlines to white
              },
            },
            x: {
              type: "time",
              title: {
                display: true,
                text: "Time",
                font: {
                  family: "Nanum Gothic Coding",
                  size: 14,
                  weight: "bold",
                  color: "#EDF1F4", // Color of y-axis title
                },
              },
              time: {
                displayFormats: {
                  quarter: "MMM YYYY",
                },
              },

              ticks: {
                color: "#EDF1F4", // Color of the x-axis labels
                maxRotation: 0, // Rotate labels to 90 degrees
                minRotation: 0,
              },
              grid: {
                color: "#1F1D36", // Set color of y-axis gridlines to white
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#EDF1F4",
                font: {
                  size: 12,
                  family: "Nanum Gothic Coding",
                },
                boxWidth: 20,
                boxHeight: 20,
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
        plugins: [ChartDataLabels],
      });

      // Cleanup function to destroy chart instance
      return () => {
        if (lineChartRef.current) {
          lineChartRef.current.destroy();
        }
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return <canvas ref={chartRef} />;
};

export default LineGraph;
