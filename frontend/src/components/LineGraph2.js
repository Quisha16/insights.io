import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../ComponentCSS/LineGraph.css';

const LineGraph2 = () => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);
  
    useEffect(() => {
      const ctx = chartRef.current.getContext('2d');
  
      
      if (chartInstance.current !== null) {
        chartInstance.current.destroy(); 
      }
  
      // Example data for positive sentiment over time
      const data = [10, 20, 60, 100, 30, 30, 70, 10, 50, 40];
  
      // Create a new chart instance and store it in chartInstance
      chartInstance.current = new Chart(ctx, {
        type: 'line',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'], // Example labels for months
          datasets: [{
            label: 'Positive Sentiment',
            data: data, // Use the data array
            borderColor: '#FFC700', // Yellow color for the line
            borderWidth: 2,
            fill: {
              target: 'origin',
              above: '#F6F4EB' , 
            }
          }]
        },
        options: {
          responsive: true,
          scales: {
            x: {
              ticks: {
                color: '#070F2B' // Set x-axis label color to white
              }
            },
            y: {
              ticks: {
                color: '#070F2B' // Set y-axis label color to white
              }
            }
          },
          plugins: {
            legend: {
              labels: {
                color: '#070F2B' // Set legend label color to white
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
        <canvas ref={chartRef} /> 
      </div>
    );
  };
  
  export default LineGraph2;
  