
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import '../ComponentCSS/stackedBarChart.css';

const StackedBarChart = () => {
  const chartRef = useRef(null);
  const stackedChartRef = useRef(null); 

  useEffect(() => {
    const ctx = chartRef.current.getContext('2d');

    
    if (stackedChartRef.current !== null) {
      stackedChartRef.current.destroy();
    }

    
    stackedChartRef.current = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Aspect 1', 'Aspect 2', 'Aspect 3', 'Aspect 4', 'Aspect 5'],
        datasets: [
          {
            label: 'Positive Sentiment',
            data: [20, 30, 40, 50, 60], 
            backgroundColor: '#F4D160', 
          },
          {
            label: 'Negative Sentiment',
            data: [10, 20, 30, 40, 50], 
            backgroundColor: '#75C2F6',
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            stacked: true,
            ticks: {
              color: '#070F2B', // Set x-axis label color 
            },
          },
          y: {
            stacked: true,
            ticks: {
              color: '#070F2B', // Set y-axis label color 
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: '#070F2B', // Set legend label color
            },
          },
        },
      },
    });

    // Cleanup function
    return () => {
      // Ensure the chart instance is destroyed when the component unmounts
      if (stackedChartRef.current !== null) {
        stackedChartRef.current.destroy();
      }
    };
  }, []);

  return (
    <div>
      <canvas ref={chartRef} className="stackedbarchart-canvas" />
    </div>
  );
};

export default StackedBarChart;
