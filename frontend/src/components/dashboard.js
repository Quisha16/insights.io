
import React from 'react';
//import { Link } from 'react-router-dom';
import DoughnutChart from './DoughnutChart';
import PolarAreaChart from './PolarAreaChart';
import LineGraph from './LineGraph'; 
import StackedBarChart from './StackedBarChart'; 
import HorizontalBarChart from './HorizontalBarChart';
import LineGraph2 from './LineGraph2'; 
import Navbar from './Navbar'; 
import '../ComponentCSS/dashboard.css';

const dashboard = () => {
  return (
    <div className="dashboard-container">
      <Navbar /> 
      <h2 className="dashboard-heading">Product Analytics</h2> 
      <div className="chart-container">
        <div className="chart">
          <div className="blurry-box">
          <h5>Customer Sentiment</h5>
            <DoughnutChart />
          </div>
        </div>
        <div className="chart">
          <div className="blurry-box">
          <h5>Customer Ratings</h5>
            <PolarAreaChart />
          </div>
        </div>
        <div className="chart">
          <div className="blurry-box">
            <h5>Product Performance Over Months</h5>
            <LineGraph />
          </div>
        </div>
        <div className="chart">
          <div className="blurry-box">
            <h5>Ratio of Positive and Negative Sentiments Overtime</h5>
            <StackedBarChart />
          </div>
        </div>
      </div>


      <div className="lower-container">
        <div className="blurry-box">
            <h5>Areas Of improvement</h5>
            <HorizontalBarChart />
          </div>
          <div className="blurry-box">
          <h5>Positive Sentiment Over Time</h5>
            <LineGraph2 />
          </div>
      </div>
    
    
    </div>
  );
};

export default dashboard;

