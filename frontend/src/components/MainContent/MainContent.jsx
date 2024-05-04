import React from "react";
import "./MainContent.css";
import DoughnutChart from "../Charts/DoughnutChart";
import PolarAreaChart from "../Charts/PolarAreaChart";
import PieChart from "../Charts/PieChart";
import LineGraph from "../Charts/LineGraph";
import StackedBarChart from "../Charts/StackedBarChart";
import HorizontalBarChart from "../Charts/HorizontalBarChart";
import LineGraph2 from "../Charts/LineGraph2";
import WordCloud from "../Charts/wordCloud";
import Card from "../Charts/card";
import jsPDF from "jspdf";

const headerTexts = ["Product Performance overtime"];

function downloadPDF(headerTexts) {
  const doc = new jsPDF();
  const canvasElements = document.querySelectorAll(".chart-element canvas");
  const canvasList = Array.from(canvasElements);
  canvasList.forEach((canvas, index) => {
    if (index > 0) {
      doc.addPage();
    }
    const imgData = canvas.toDataURL("image/jpeg");
    doc.addImage(imgData, "JPEG", 15, 15, 150, 130);
    // Add header text
    if (headerTexts && headerTexts[index]) {
      doc.text(10, 10, headerTexts[index]);
    }
  });
  doc.save("charts.pdf");
}

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="title-bar">
        <div className="logo">
          <span>
            Insights<span>.io</span>
          </span>
        </div>
        <h1 className="title">Dashboard</h1>
        <button
          onClick={() => downloadPDF(headerTexts)} // Corrected onClick attribute
          style={{
            // Corrected style attribute
            width: "150px",
            height: "40px",
            backgroundColor: "#007bff",
            color: "#ffffff",
          }}
        >
          PDF Version
        </button>
      </div>
      <div className="chart-layout">
        <div className="chart-element line-graph">
          <h5>Product Performance Overtime </h5>
          <LineGraph />
        </div>
        <div className="chart-element card1">
          <Card />
        </div>
        <div className="chart-element pie-chart">
          <h5>Customer Ratings </h5>
          <PieChart />
        </div>

        <div className="chart-element card2">
          <Card />
        </div>

        <div className="chart-element doughnut-chart ">
          <h5>Customer Sentiment</h5>
          <DoughnutChart />
        </div>

        <div className="chart-element stacked-bar">
          <h5>Ratio of Positive and Negative Sentiments Overtime</h5>
          <StackedBarChart />
        </div>
        <div className="chart-element polar-chart">
          <h5>Customer Ratings </h5>
          <PolarAreaChart />
        </div>
        <div className="chart-element word-cloud">
          <h5>Sentiment Word Cloud</h5>
          <WordCloud />
        </div>
        <div className="chart-element word-cloud">
          <h5>Sentiment Word Cloud</h5>
          <WordCloud />
        </div>
      </div>
    </div>
  );
};
export default MainContent;
