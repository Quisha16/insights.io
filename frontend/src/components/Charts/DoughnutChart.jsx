
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import './Charts.css';

// const DoughnutChart = () => {
//   const chartRef = useRef(null);
//   const chartInstance = useRef(null);

//   useEffect(() => {
//     const ctx = chartRef.current.getContext('2d');
    
//     if (chartInstance.current !== null) {
//       chartInstance.current.destroy(); // Destroy the previous Chart instance
//     }

//     chartInstance.current = new Chart(ctx, {
//       type: 'doughnut', 
//       data: {
//         labels: ['Positive', 'Negative'],
//         datasets: [{
//           label: 'Reviews',
//           data: [70, 30], // Hardcoded values for positive and negative reviews
//           backgroundColor: [
//             "#FFC7C7", // positive reviews
//             "#F3CCF3", // negative reviews
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         plugins: {
//           legend: {
//             labels: {
//               color: '##070F2B' // Set legend label color
//             }
//           }
//         }
//       }
//     });

//     return () => {
//       if (chartInstance.current !== null) {
//         chartInstance.current.destroy(); // Cleanup on component unmount
//       }
//     };
//   }, []);

//   return (
//     <div>
//       <canvas ref={chartRef} className="Doughnut-canvas" /> 
//     </div>
//   );
// };

// export default DoughnutChart;

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
          labels: labels,
          datasets: [{
            label: 'Reviews',
            data: data,
            backgroundColor: [
              '#FFC7C7', // Yellow-positive reviews
              '#F3CCF3', // Blue-negative reviews
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
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div>
      <canvas ref={chartRef} className="Doughnut-canvas" /> 
    </div>
  );
};

export default DoughnutChart;