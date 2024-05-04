import React, { useState, useEffect } from 'react';
import '../MainContent/MainContent.css';

const CardTwo = () => {
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalNegative, setTotalNegative] = useState(0);
  const [overallSentiment, setOverallSentiment] = useState('');
  const [lastPositiveCount, setLastPositiveCount] = useState(0);
  const [lastNegativeCount, setLastNegativeCount] = useState(0);
  const [lastPositivePercent, setLastPositivePercent] = useState(0);
  const [lastNegativePercent, setLastNegativePercent] = useState(0);

  useEffect(() => {
    fetchDataOne();
    fetchDataTwo();
  }, []);

  const fetchDataOne = async () => {
    try {
      const response = await fetch("http://localhost:8000/sentiment_prediction/");
      const responseData = await response.json();
      const [labels, data] = [Object.keys(responseData.prediction_data), Object.values(responseData.prediction_data)];

      var x = data[0]+data[1];
      setTotalNegative(data[0]/x*100.0);
      setTotalPositive(data[1]/x*100.0);
      setOverallSentiment(data[1] >= data[0] ? 'Positive' : 'Negative');
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataTwo = async () => {
    try {
      const response = await fetch("http://localhost:8000/customer_overtime_sentiment/");
      const responseData = await response.json();

      const zeroData = responseData.zero_overtime_sentiment_data;
      const oneData = responseData.one_overtime_sentiment_data;
      const labels = [
        ...new Set([...Object.keys(zeroData), ...Object.keys(oneData)]),
      ];
      labels.sort((a, b) => new Date(a) - new Date(b));

      const zeroValues = Object.values(zeroData);
      const oneValues = Object.values(oneData);


      setLastNegativeCount(zeroValues[zeroValues.length-1]);
      setLastPositiveCount(oneValues[oneValues.length-1]);
      var x = lastPositiveCount/(totalPositive-lastPositiveCount);
      var y = lastNegativeCount/(totalNegative-lastNegativeCount);
      setLastPositivePercent(x*100.0)
      setLastNegativePercent(y*100.0)
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="card">
      <div className="card-body">
        <div className="info-container">
          <div className="info-box">
            <span className="info-label">Positive Sentiment</span>
            <span className="info-value">{totalPositive.toFixed(2)} %</span>
            <span className="info-increase">&#8593;{lastPositiveCount} &nbsp; &nbsp; &nbsp;</span>
            <span className="info-update-percent">+{lastPositivePercent.toFixed(2)}% Over Last 30 Days</span>
          </div>
          <div className="info-box">
            <span className="info-label">Negative Sentiment</span>
            <span className="info-value">{totalNegative.toFixed(2)} %</span>
            <span className="info-decrease">&#8595;{lastNegativeCount} &nbsp; &nbsp; &nbsp;</span>
            <span className="info-update-percent">-{lastNegativePercent.toFixed(2)}% Over Last 30 Days</span>
          </div>
          <div className="info-box">
            <span className="info-label">Overall Sentiment</span>
            <span className="info-value">{overallSentiment}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardTwo;
