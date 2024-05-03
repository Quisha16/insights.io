import React from 'react';
import './MainContent.css';
import DoughnutChart from '../Charts/DoughnutChart';
import PolarAreaChart from '../Charts/PolarAreaChart';
import LineGraph from '../Charts/LineGraph'; 
import StackedBarChart from '../Charts/StackedBarChart'; 
import HorizontalBarChart from '../Charts/HorizontalBarChart';
import LineGraph2 from '../Charts/LineGraph2';
import WordCloud from '../Charts/wordCloud'; 
import Card from '../Charts/card';


const MainContent = () => {
 
  return (
    <div className="main-content">
      <div className="title-bar">
        <h1 className="title">Dashboard</h1>
      </div>
      <div className="chart-layout">
        <div className="chart-element line-graph">
          <h5>Product Performance Over Months</h5>
          <LineGraph />
        </div>
        <div className="chart-element">
          <h5>Customer Ratings</h5>
          <PolarAreaChart />
        </div>
        <div className="chart-element">
          <h5>Ratio of Positive and Negative Sentiments Overtime</h5>
          <StackedBarChart />
        </div>
        <div className="chart-element">
          <h5>Customer Sentiment</h5>
          <DoughnutChart />
        </div>
        <div className="chart-element">
          <h5>Areas Of improvement</h5>
          <HorizontalBarChart />
        </div>
        <div className="chart-element">
          <h5>Positive Sentiment Over Time</h5>
          <LineGraph2 />
        </div>
        <div className="chart-element">
          <h5>Sentiment Word Cloud</h5>
          <WordCloud /> 
        </div>
        <div className="chart-element">
          <h5>Review Summary</h5>
          <Card /> 
        </div>
      </div> 
    </div>
  )
}

export default MainContent;


// import React from 'react';
// import Carousel from 'react-bootstrap/Carousel';
// import DoughnutChart from '../Charts/DoughnutChart';
// import PolarAreaChart from '../Charts/PolarAreaChart';
// import LineGraph from '../Charts/LineGraph'; 
// import StackedBarChart from '../Charts/StackedBarChart'; 
// import HorizontalBarChart from '../Charts/HorizontalBarChart';
// import LineGraph2 from '../Charts/LineGraph2';
// import WordCloud from '../Charts/wordCloud'; // Import the WordCloudComponent

// const MainContent = () => {
//   return (
//     <Carousel>
//       <Carousel.Item>
//         <div>
//           <PolarAreaChart />
//           <LineGraph/>
//           <StackedBarChart/>
//         </div>
//       </Carousel.Item>
//       <Carousel.Item>
//         <div>
//           <DoughnutChart />
//           <HorizontalBarChart/>
//           <LineGraph2/>
//         </div>
//       </Carousel.Item>
//       <Carousel.Item>
//         <div>
//           <WordCloud /> 
//         </div>
//       </Carousel.Item>
//     </Carousel>
//   );
// }

// export default MainContent;






