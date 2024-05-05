import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from "moment";
import "chartjs-adapter-moment"; // This will register the Moment.js adapter with Chart.js
import '../MainContent/MainContent.css';


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

      labels.forEach(label => {
          zeroValues.push(zeroData[label] || 0); // If no data available for label, push 0
          oneValues.push(oneData[label] || 0); // If no data available for label, push 0
      });


      const ctx = chartRef.current.getContext("2d");
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }

      lineChartRef.current = new Chart(ctx, {
        type: "line",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Positive Sentiment",
              data: oneValues, // Example data for positive sentiment over months
              borderColor: "#19EE9E", // Positive sentiment line color
              borderWidth: 1,
              fill: false,
            },
            {
              label: "Negative Sentiment",
              data: zeroValues, // Example data for negative sentiment over months
              borderColor: "#11C3CB ", // Negative sentiment line color
              borderWidth: 2,
              fill: false,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#EDF1F4", // Color of the y-axis labels
              },
              grid: {
                color: "rgba(255,255,255,0.1)" // Set color of y-axis gridlines to white
              }
            },
            x: {
              type: "time",
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
                color: "rgba(255,255,255,0.1)", // Set color of y-axis gridlines to white
              },
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#EDF1F4", // Color of the legend labels
              },
            },
          },
        },
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
  return (
      <canvas ref={chartRef} />
  );
};

export default LineGraph;
