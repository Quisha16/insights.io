import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from 'chartjs-plugin-datalabels';

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
              label: "Review Count",
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
              display: false,
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
              },
            },
            datalabels: {
              formatter: (value, ctx) => {
                  const datapoints = ctx.chart.data.datasets[0].data
                  const total = datapoints.reduce((total, datapoint) => total + datapoint, 0)
                  const percentage = value / total * 100
                  return percentage.toFixed(2) + "%";
              },
              color: '#000',
          }
          },
          
        },
        plugins: [ChartDataLabels],
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
