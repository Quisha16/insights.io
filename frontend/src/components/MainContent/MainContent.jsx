import React from "react";
import "./MainContent.css";
import DoughnutChart from "../Charts/DoughnutChart";
import PolarAreaChart from "../Charts/PolarAreaChart";
import PieChart from "../Charts/PieChart";
import LineGraph from "../Charts/LineGraph";
import StackedBarChart from "../Charts/StackedBarChart";
import WordCloud from "../Charts/WordCloud";
import CardOne from "../Charts/CardOne";
import CardTwo from "../Charts/CardTwo";

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="chart-layout">
        <div className="chart-element line-graph">
          <h5>Product Performance Overtime </h5>
          <LineGraph />
        </div>
        <div className="chart-element card1">
          <CardOne />
        </div>
        <div className="chart-element pie-chart">
          <h5>Customer Ratings</h5>
          <PieChart />
        </div>

        <div className="chart-element card2">
          <CardTwo />
        </div>

        <div className="chart-element doughnut-chart ">
          <h5>Sentiment Prediction Score</h5>
          <DoughnutChart />
        </div>

        <div className="chart-element stacked-bar">
          <h5>Ratio of Positive and Negative Sentiments Overtime</h5>
          <StackedBarChart />
        </div>
        <div className="chart-element polar-chart">
          <h5>Top Issues</h5>
          <PolarAreaChart />
        </div>
        <div className="chart-element word-cloud">
          <h5>Positive Sentiment Word Cloud</h5>
          <WordCloud imageName="wordcloud_positive" />
        </div>
        <div className="chart-element word-cloud">
          <h5>Negative Sentiment Word Cloud</h5>
          <WordCloud imageName="wordcloud_negative" />
        </div>
      </div>
    </div>
  );
};

export default MainContent;
