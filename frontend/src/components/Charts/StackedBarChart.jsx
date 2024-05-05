
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
              backgroundColor: "#4AC295",
            },
            {
              label: "Negative Sentiments",
              data: zeroValues,
              backgroundColor: "#39AFE0",
            },
          ],
        },
        options: {
          plugins: {
            legend: {
              labels: {
                color: "#EDF1F4", // Set legend label color
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
            },
            y: {
              stacked: true,
              display: true,

              ticks: {
                color: "#EDF1F4", // Set y-axis label color
              },
            },
          },
          barThickness: 5
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
