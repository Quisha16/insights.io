
const renderDoughnutChart=(data, labels) => {
    const ctx = document.getElementById('myChart').getContext("2d");
    new Chart(ctx, {
    type: 'doughnut',
    data: {
        labels: labels,
        datasets: [{
        label: "Customer Sentiment Prediction",
        data: data,
        backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(255, 159, 64, 1)",
            "rgba(54, 162, 235, 1)",
            ],
        borderWidth: 1
        }]
    },
    options: {
        plugins: {
            title: {
                display: true,
                text:'Customer Sentiment Prediction'
            }
    }
    }
    });
}

const renderLineChart=(data, labels) => {

    const ctx2 = document.getElementById('myLineChart').getContext("2d");

    new Chart(ctx2, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Positive sentiment over time',
          data: data,
          backgroundColor: "rgba(134, 135, 255, 1)",
          borderColor: "rgba(134, 135, 255, 1)",
            borderWidth: 2
        }]
      },
      options: {
        title: {
            display: true,
            text:'Count of Positive Sentiment over Time'
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                }
            },
            y: {
                display: true,
                title: {
                  display: true,
                  text: 'Count'
                }
              }
        }
    }
    });
}

const renderMultiLineChart=(zeroData, oneData, labels) => {

    const ctx3 = document.getElementById('myMultiLineChart').getContext("2d");

    new Chart(ctx3, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Positive sentiments',
          data: oneData,
          backgroundColor: "rgba(134, 135, 255, 1)",
          borderColor: "rgba(134, 135, 255, 1)",
          borderWidth: 1,
          fill: false
        },
        {
            label: 'Negative sentiments',
            data: zeroData,
            borderColor: "rgba(255, 99, 132, 1)",
            backgroundColor: "rgba(255, 99, 132, 1)",
            borderWidth: 1,
            fill: true
          }]
      },
      options: {
        title: {
            display: true,
            text:'Customer Rating over time'
        },
        scales: {
            x: {
                type: 'time',
                time: {
                    displayFormats: {
                        quarter: 'MMM YYYY'
                    }
                }
            },
            y: {
                display: true,
                title: {
                  display: true,
                  text: 'Count'
                }
              }
        }
    }
    });
}

const renderPolarAreaChart=(data, labels) => {
    const ctx4 = document.getElementById('myPolarAreaChart').getContext("2d");
    new Chart(ctx4, {
    type: 'polarArea',
    data: {
        labels: labels,
        datasets: [{
        label: "Customer  Rating",
        data: data,
        backgroundColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            ],
            borderColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            ],
        borderWidth: 1
        }]
    },
    options: {
        plugins:{
            title: {
                display: true,
                text:'Customer Rating'
            }
        }
    }
    });
}

const renderStackedBarChart=(zeroValues, oneValues, labels) => {
    const ctx5 = document.getElementById('myStackedBarChart').getContext("2d");
    new Chart(ctx5, {
    type: 'bar',
    data: {
        labels: labels,
        datasets: [{
            label: "Positive Sentiments",
            data: oneValues,
            backgroundColor:"rgba(255, 99, 132, 0.7)",
            },
            {
                label: 'Negative Sentiments',
                data: zeroValues,
                backgroundColor: "rgba(255, 159, 64, 0.7)",
            }
    ]},
    options: {
        plugins: {
            title: {
                display: true,
                text:'Ratio of Positive and Negative Sentiments Overtime'
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
                }
          },
          y: {
            stacked: true,
            display: true,
                title: {
                  display: true,
                  text: 'Count'
                }
          }
        }
    }
    });
}

const renderBarChart=(data, labels) => {
    const ctx6 = document.getElementById('myBarChart').getContext("2d");
    new Chart(ctx6, {
    type: 'bar',
    data: {
        //labels: labels,
        labels: ['battery', 'phone ui', 'screen refresh rate', 'memory', 'package', 'sound quality'],
        datasets: [{
            label: "Count",
            data: [10,23,43,12,4,42],
            backgroundColor:"rgba(255, 206, 86, 0.7)"
            }
    ]},
    options: {
        plugins: {
            title: {
                display: true,
                text:'Areas for Improvement'
            }
        },
        indexAxis: 'y',
    }
    });
}
    

const getDoughnutData = () =>{
    fetch("/sentiment_prediction")
    .then(res=>res.json())
    .then(results=>{
        const prediction_data = results.prediction_data;
        const [labels, data]=[Object.keys(prediction_data), Object.values(prediction_data)];
        renderDoughnutChart(data,labels);
    })
}

const getLineChartData = () =>{
    fetch("/customer_overtime_positive_sentiment")
    .then(res=>res.json())
    .then(results=>{
        const overtime_sentiment_data = results.overtime_sentiment_data;
        const [labels, data]=[Object.keys(overtime_sentiment_data), Object.values(overtime_sentiment_data)];
        renderLineChart(data,labels);
    })
}

const getMultiLineStackedBarChartData = () =>{
    fetch("/customer_overtime_sentiment")
    .then(res=>res.json())
    .then(results=>{
        const zeroData = results.zero_overtime_sentiment_data;
        const oneData = results.one_overtime_sentiment_data;

        const labels = [...new Set([...Object.keys(zeroData), ...Object.keys(oneData)])];
        labels.sort((a, b) => new Date(a) - new Date(b));

        const zeroValues = Object.values(zeroData);
        const oneValues = Object.values(oneData);
        
        renderMultiLineChart(zeroValues, oneValues, labels);
        renderStackedBarChart(zeroValues, oneValues, labels);
    })
}

const getPolarAreaChartData = () =>{
    fetch("/customer_rating")
    .then(res=>res.json())
    .then(results=>{
        const rating_data = results.rating_data;
        const [labels, data]=[Object.keys(rating_data), Object.values(rating_data)];
        renderPolarAreaChart(data,labels);
        renderBarChart(data, labels);
    })
}


document.addEventListener('DOMContentLoaded', function() {
    getDoughnutData();
    getLineChartData();
    getMultiLineStackedBarChartData();
    getPolarAreaChartData();
});
