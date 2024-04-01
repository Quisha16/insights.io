
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../ComponentCSS/DoughnutChart.css'; // Import the CSS file for styling

const DoughnutChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');
    
    if (chartInstance.current !== null) {
      chartInstance.current.destroy(); // Destroy the previous Chart instance
    }

    chartInstance.current = new Chart(ctx, {
      type: 'doughnut', 
      data: {
        labels: ['Positive', 'Negative'],
        datasets: [{
          label: 'Reviews',
          data: [70, 30], // Hardcoded values for positive and negative reviews
          backgroundColor: [
            '#ffc872', // Yellow-positive reviews
            '#006bbb', // Blue-negative reviews
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            labels: {
              color: '##070F2B' // Set legend label color
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
  }, []);

  return (
    <div>
      <canvas ref={chartRef} className="Doughnut-canvas" /> 
    </div>
  );
};

export default DoughnutChart;

