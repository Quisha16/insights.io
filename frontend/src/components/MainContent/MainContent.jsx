import React from 'react';
import './MainContent.css';
import DoughnutChart from '../Charts/DoughnutChart';
import PolarAreaChart from '../Charts/PolarAreaChart';
import LineGraph from '../Charts/LineGraph'; 
import StackedBarChart from '../Charts/StackedBarChart'; 
import HorizontalBarChart from '../Charts/HorizontalBarChart';
import LineGraph2 from '../Charts/LineGraph2';
import WordCloud from '../Charts/wordCloud'; // Import the WordCloudComponent
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
            <WordCloud /> 
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






