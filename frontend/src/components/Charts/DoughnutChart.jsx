
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';


const DoughnutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/sentiment_prediction/');
      const responseData = await response.json();
      const [labels, data]=[Object.keys(responseData.prediction_data), Object.values(responseData.prediction_data)];

      const ctx = chartRef.current.getContext('2d');
      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); // Destroy the previous Chart instance
      }
      chartInstance.current = new Chart(ctx, {
        type: 'doughnut', 
        data: {
          labels: ["Negative Sentiment","Positive Sentiment"],
          datasets: [{
            label: 'Reviews',
            data: data,
            backgroundColor: [
              '#4AC295', // positive reviews
              '#4399BA', // negative reviews
            ],
            borderWidth: 0
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              labels: {
                color: '#EDF1F4' // Set legend label color
              }
            }
          }
        }
      });

      return () => {
        if (chartInstance.current !== null) {
          chartInstance.current.destroy(); // Cleanup on component unmount
        }
      };
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
      <canvas ref={chartRef} /> 
  );
};

export default DoughnutChart;