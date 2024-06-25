import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import React from "react";
import "./features.css";

const Features = () => {
    return (
        <div className="features">
        <Sidebar/>
        <div className="features-container">
          <h1>Key Features</h1>
          <ul>
            <li><span>Feature 1:</span> Input by Link <br /> 
            This allows users to analyze sentiment directly from websites. The application would webscrape the data from the provided link, eliminating the need for manual data entry.</li>
            <li><span>Feature 2:</span> Input by CSV<br />
             This caters to users who have pre-collected sentiment data in a CSV (Comma-Separated Values) format. Uploading the CSV allows the application to analyze the existing data.</li>
            <li><span>Feature 3:</span> Dashboard with Visualized Representation of Sentiment Analysis<br />
             This feature is crucial for users to understand the sentiment at a glance. It could include visualizations like: 
                <ul>
                    <li>Sentiment Distribution: Charts or graphs showing the percentage of positive, negative, and neutral sentiment within the data.</li>
                    <li>Topic Clouds: Words or phrases weighted by their frequency and sentiment, giving a visual representation of the most prominent topics and their overall sentiment.</li>
                    <li>Line Charts: Tracking sentiment over time if the data has a time component (e.g., social media posts with timestamps).</li>
                </ul>
            </li>
            <li><span>Feature 4:</span> Download Report Feature<br />
            This allows users to download a report summarizing the sentiment analysis.</li>
          </ul>
        </div>
          <Footer/>
        </div>
      );
};

export default Features;

