import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../ComponentCSS/polarAreaChart.css';

const PolarAreaChart = () => {
  const chartRef = useRef(null);
  const polarChartRef = useRef(null); // Store the chart instance in a useRef hook

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

   
    if (polarChartRef.current !== null) {
      polarChartRef.current.destroy(); 
    }

   
    polarChartRef.current = new Chart(ctx, {
      type: 'polarArea',
      data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [{
          label: 'Customer Ratings',
          data: [10, 20, 30, 40, 50], // Hardcoded values for customer ratings
          backgroundColor: [
            'rgba(12, 53, 106, 0.6)',  // #0C356A
            'rgba(29, 93, 155, 0.6)',  // #1D5D9B
            'rgba(117, 194, 246, 0.6)',  // #75C2F6
            'rgba(244, 209, 96, 0.6)',  // #F4D160
            'rgba(251, 238, 172, 0.6)'  // #FBEEAC
          ],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            display: true 
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#070F2B' 
            }
          }
        }
      }
    });
    // Cleanup function
    return () => {
      // Ensure the chart instance is destroyed when the component unmounts
      if (polarChartRef.current !== null) {
        polarChartRef.current.destroy();
      }
    };
}, []);

return (
  <div>
    <canvas ref={chartRef} className="polarChart-canvas" />
  </div>
);
};

export default PolarAreaChart;


