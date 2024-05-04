import React, { useState, useEffect } from 'react';
import '../MainContent/MainContent.css';

const CardOne = () => {
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalNegative, setTotalNegative] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/sentiment_prediction/");
        const responseData = await response.json();
        const [labels, data] = [Object.keys(responseData.prediction_data), Object.values(responseData.prediction_data)];

        setTotalNegative(data[0]);
        setTotalPositive(data[1]);
        setTotalReviews(data[0] + data[1]);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="card">
      <div className="card-header">
        
      </div>
      <div className="card-body">
        <div className="info-container">
          <div className="info-box">
            <span className="info-label">Total Reviews:</span>
            <span className="info-value">{totalReviews}</span>
          </div>
          <div className="info-box">
            <span className="info-label">Total Positive Reviews:</span>
            <span className="info-value">{totalPositive}</span>
          </div>
          <div className="info-box">
            <span className="info-label">Total Negative Reviews:</span>
            <span className="info-value">{totalNegative}</span>
          </div>
        </div>
      </div>
    </div>
  );  
};

export default CardOne;