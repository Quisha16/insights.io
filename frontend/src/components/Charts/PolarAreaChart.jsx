import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";

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
      const [labels, data] = [
        Object.keys(responseData.negative_aspects),
        Object.values(responseData.negative_aspects),
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
              label: " Review Count",
              data: data,
              backgroundColor: [
                "rgba(0, 121, 231, 1)",
                "rgba(82, 145, 211, 1)",
                "rgba(73, 33, 236, 1)",
                "rgba(108, 34, 166, 1)",
                "rgba(135, 108, 223, 1)",
                "rgba(0, 121, 231, 0.7)",
                "rgba(82, 145, 211, 0.7)",
                "rgba(73, 33, 236, 0.7)",
                "rgba(108, 34, 166, 0.7)",
                "rgba(135, 108, 223, 0.7)",
                "rgba(0, 121, 231, 0.3)",
                "rgba(82, 145, 211, 0.3)",
                "rgba(73, 33, 236, 0.3)",
                "rgba(108, 34, 166, 0.3)",
                "rgba(135, 108, 223, 0.3)",
                "rgba(0, 121, 231, 0.1)",
                "rgba(82, 145, 211, 0.1)",
                "rgba(73, 33, 236, 0.1)",
                "rgba(108, 34, 166, 0.1)",
                "rgba(135, 108, 223, 0.1)",
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
            datalabels: {
              formatter: (value, ctx) => {
                const datapoints = ctx.chart.data.datasets[0].data;
                const total = datapoints.reduce(
                  (total, datapoint) => total + datapoint,
                  0
                );
                const percentage = (value / total) * 100;
                return percentage.toFixed(2) + "%";
              },
              color: "#EDF1F4",
              align: "end",
              offset: 65, 
              font:  {
                size: 12,
                family: "Nanum Gothic Coding",
              },
            },
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
