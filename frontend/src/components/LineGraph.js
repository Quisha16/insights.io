
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../ComponentCSS/LineGraph.css';

const LineGraph = () => {
  const chartRef = useRef(null);
  const lineChartRef = useRef(null);

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    
    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

    lineChartRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
          label: 'Positive Sentiment',
          data: [100, 120, 130, 110, 150, 140], // Example data for positive sentiment over months
          borderColor: '#FFC436', // Positive sentiment line color
          borderWidth: 2,
          fill: false
        },
        {
          label: 'Negative Sentiment',
          data: [80, 90, 70, 100, 85, 95], // Example data for negative sentiment over months
          borderColor: '#0174BE', // Negative sentiment line color
          borderWidth: 2,
          fill: false
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true,
            ticks: {
              color: '#070F2B' // Color of the y-axis labels
            }
          },
          x: {
            ticks: {
              color: '#070F2B' // Color of the x-axis labels
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#070F2B' // Color of the legend labels
            }
          }
        }
      }
    });

    // Cleanup function to destroy chart instance
    return () => {
      if (lineChartRef.current) {
        lineChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div className="chart">
      <canvas ref={chartRef} />
    </div>
  );
};

export default LineGraph;

