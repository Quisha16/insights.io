import React, { useState, useEffect } from "react";
import "../MainContent/MainContent.css";

const CardTwo = () => {
  const [totalPositive, setTotalPositive] = useState(0);
  const [totalNegative, setTotalNegative] = useState(0);
  const [overallSentiment, setOverallSentiment] = useState("");
  const [lastPositiveCount, setLastPositiveCount] = useState(0);
  const [lastNegativeCount, setLastNegativeCount] = useState(0);
  const [lastPositivePercent, setLastPositivePercent] = useState(0);
  const [lastNegativePercent, setLastNegativePercent] = useState(0);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(
        "http://localhost:8000/sentiment_info/"
      );
      const responseData = await response.json();
      const data = responseData.prediction_data;
      const latestData = responseData.last_month_reviews;
      var x = data[0] + data[1];
      setTotalNegative((data[0] / x) * 100.0);
      setTotalPositive((data[1] / x) * 100.0);
      setOverallSentiment(data[1] >= data[0] ? "Positive" : "Negative");

      const zeroVal = latestData['negative'];
      const oneVal = latestData['positive'];

      setLastNegativeCount(zeroVal)
      setLastPositiveCount(oneVal);

      var x = oneVal / (data[1] - oneVal);
      var y = zeroVal / (data[0] - zeroVal);
      setLastPositivePercent(x * 100.0);
      setLastNegativePercent(y * 100.0);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    
    <div className="card-two">
      <div className="info-container-two">
        <div className="info-box-two">
          <span className="info-label-two">Positive Sentiment</span>
          <span className="info-value-two">{totalPositive.toFixed(2)} %</span>
          {/* <div className="update-wrapper">
            <span className="info-increase">
              &#8593;{lastPositiveCount} &nbsp; &nbsp; &nbsp;
            </span>
            <span className="info-update-percent">
              +{lastPositivePercent.toFixed(2)}% Over Last 30 Days
            </span>
          </div> */}
        </div>
        <div className="info-box-two">
          <span className="info-label-two">Negative Sentiment</span>
          <span className="info-value-two">{totalNegative.toFixed(2)} %</span>
          {/* <div className="update-wrapper">
            <span className="info-decrease">
              &#8595;{lastNegativeCount} &nbsp; &nbsp; &nbsp;
            </span>
            <span className="info-update-percent">
              -{lastNegativePercent.toFixed(2)}% Over Last 30 Days
            </span>
          </div> */}
        </div>
        <div className="info-box-two">
          <span className="info-label-two">Overall Sentiment</span>
          <span className="info-value-two  overall-label">
            {overallSentiment}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CardTwo;
