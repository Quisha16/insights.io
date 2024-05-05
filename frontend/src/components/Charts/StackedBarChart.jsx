
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import "chartjs-adapter-moment";
import moment from "moment";
import ChartDataLabels from 'chartjs-plugin-datalabels';


const StackedBarChart = () => {
  const chartRef = useRef(null);
  const stackedChartRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/customer_overtime_sentiment/"
      );
      const responseData = await response.json();
      console.log(responseData);
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
      if (stackedChartRef.current !== null) {
        stackedChartRef.current.destroy();
      }
      stackedChartRef.current = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Positive Sentiments",
              data: oneValues,
              backgroundColor: "#9F88FD",
            },
            {
              label: "Negative Sentiments",
              data: zeroValues,
              backgroundColor: "#1EA8DF",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              
              labels: {
                color: "#EDF1F4", // Set legend label color
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

            datalabels: {
              formatter: function(value, context) {
                  const sumValue = context.chart.config.data.datasets.map((datapoint) =>
                  {
                    return datapoint.data[context.dataIndex]
                  })
                  function totalSum(total, datapoint) {
                    return total + datapoint;
                  }
                  let sum = sumValue.reduce(totalSum, 0);
                  let percent=(value/sum*100.0).toFixed(1);
                  if (percent !== "0.0") {
                    return `${percent}%`;
                } else {
                    return ''; // Return empty string if percentage is 0
                }         
                },
              color: "#fff", 
              anchor: 'center',
              align:'',
              offset: -25,
              rotation: -90,
              display:  'auto'
          },
          },
          responsive: true,
          scales: {
            x: {
              stacked: true,
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
              type: "time",
              time: {
                displayFormats: {
                  quarter: "MMM YYYY",
                },
              },
              ticks: {
                color: "#EDF1F4", 
                maxRotation: 0, // Rotate labels to 90 degrees
                minRotation: 0,
              },
              grid: {
                color: "#1F1D36", // Set color of y-axis gridlines to white
              },
            },
            y: {
              stacked: true,
              display: true, title: {
                display: true,
                text: "Count Of Reviews",
                font: {
                  family: "Nanum Gothic Coding",
                  size: 14,
                  weight: "bold",
                  color: "#EDF1F4", // Color of y-axis title
                },
              },
              grid: {
                color: "#1F1D36", // Set color of y-axis gridlines to white
              },


              ticks: {
                color: "#EDF1F4", // Set y-axis label color
              },
            },
          },
          barThickness: 10
        },
        plugins: [ChartDataLabels],
      });

      // Cleanup function
      return () => {
        // Ensure the chart instance is destroyed when the component unmounts
        if (stackedChartRef.current !== null) {
          stackedChartRef.current.destroy();
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

export default StackedBarChart;
