
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'chartjs-adapter-moment';
import '../ComponentCSS/charts.css';

const StackedBarChart = () => {
  const chartRef = useRef(null);
  const stackedChartRef = useRef(null); 

  useEffect(() => {
    fetchData();
  }, []);
  
  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:8000/customer_overtime_sentiment/');
      const responseData = await response.json();
      console.log(responseData);
      const zeroData = responseData.zero_overtime_sentiment_data;
      const oneData = responseData.one_overtime_sentiment_data;
      const labels = [...new Set([...Object.keys(zeroData), ...Object.keys(oneData)])];
      labels.sort((a, b) => new Date(a) - new Date(b));

      const zeroValues = Object.values(zeroData);
      const oneValues = Object.values(oneData);
  
  const ctx = chartRef.current.getContext('2d'); 
  if (stackedChartRef.current !== null) {
    stackedChartRef.current.destroy();
  }
  stackedChartRef.current = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: "Positive Sentiments",
            data: oneValues,
            backgroundColor:'#F4D160',
            },
            {
                label: 'Negative Sentiments',
                data: zeroValues,
                backgroundColor: '#75C2F6',
            }
    ]},
    options: {
        plugins: {
          legend: {
            labels: {
              color: '#070F2B', // Set legend label color
            },
          }
           
        },
        responsive: true,
        scales: {
          x: {
            stacked: true,
            type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                },
                ticks: {
                  color: '#070F2B', // Set x-axis label color 
                },
          },
          y: {
            stacked: true,
            display: true,
            
                ticks: {
                  color: '#070F2B', // Set y-axis label color 
                },
          }
        }
    }
    });

  // Cleanup function
  return () => {
    // Ensure the chart instance is destroyed when the component unmounts
    if (stackedChartRef.current !== null) {
      stackedChartRef.current.destroy();
    }
  };
} catch (error) {
  console.error('Error fetching data:', error);
}
  };
  return (
    <div>
      <canvas ref={chartRef} className="stackedbarchart-canvas" />
    </div>
  );
};

export default StackedBarChart;
