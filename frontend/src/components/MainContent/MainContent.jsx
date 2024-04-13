import React from 'react';
import './MainContent.css';
import DoughnutChart from '../Charts/DoughnutChart';
import PolarAreaChart from '../Charts/PolarAreaChart';
import LineGraph from '../Charts/LineGraph'; 
import StackedBarChart from '../Charts/StackedBarChart'; 
import HorizontalBarChart from '../Charts/HorizontalBarChart';
import LineGraph2 from '../Charts/LineGraph2';
const MainContent = () => {
  return (
    <div className="maincontent">
        <h1 className='title'>Dashboard</h1>
      <div className="chartlayout">
            <PolarAreaChart />
            <LineGraph/>
            <StackedBarChart/>
            <DoughnutChart />
            <HorizontalBarChart/>
            <LineGraph2/>
            </div>
            
      </div>

 

  )
}

export default MainContent;
