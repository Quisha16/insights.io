import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./Charts.css";
// const PolarAreaChart = () => {
//   const chartRef = useRef(null);
//   const polarChartRef = useRef(null); // Store the chart instance in a useRef hook

//   useEffect(() => {
//     const ctx = chartRef.current.getContext('2d');

//     if (polarChartRef.current !== null) {
//       polarChartRef.current.destroy();
//     }

//     polarChartRef.current = new Chart(ctx, {
//       type: 'polarArea',
//       data: {
//         labels: ['1', '2', '3', '4', '5'],
//         datasets: [{
//           label: 'Customer Ratings',
//           data: [10, 20, 30, 40, 50], // Hardcoded values for customer ratings
//           backgroundColor: [
//             "rgba(255, 99, 132, 1)",
//             "rgba(153, 102, 255, 0.2)",
//             "rgba(255, 206, 86, 0.2)",
//             "rgba(255, 99, 132, 0.2)",
//             "rgba(255, 159, 64, 0.2)",
//             "rgba(75, 192, 192, 0.2)",
//             "rgba(54, 162, 235, 0.2)",
//           ],
//           borderWidth: 1
//         }]
//       },
//       options: {
//         responsive: true,
//         scales: {
//           r: {
//             display: true
//           }
//         },
//         plugins: {
//           legend: {
//             labels: {
//               color: '#070F2B'
//             }
//           }
//         }
//       }
//     });
//     // Cleanup function
//     return () => {
//       // Ensure the chart instance is destroyed when the component unmounts
//       if (polarChartRef.current !== null) {
//         polarChartRef.current.destroy();
//       }
//     };
// }, []);

// return (
//   <div>
//     <canvas ref={chartRef} className="polarChart-canvas" />
//   </div>
// );
// };

// export default PolarAreaChart;

const PolarAreaChart = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/customer_rating/");
      const responseData = await response.json();
      const [labels, data] = [
        Object.keys(responseData.rating_data),
        Object.values(responseData.rating_data),
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
              label: "Customer Ratings",
              data: data,
              backgroundColor: [
                "  #83D4E4", 
                "#2D8B9D", 
                "#007C8F", 
                "#00657A", 
                "#50ADCC"  
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          scales: {
            r: {
              display: true,
            },
          },
          plugins: {
            legend: {
              labels: {
                color: "#EDF1F4",
              },
            },
          },
        },
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
