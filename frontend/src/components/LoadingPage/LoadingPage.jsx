import React, { useState, useEffect } from "react";
import "./LoadingPage.css"; 

const messages = [
  "Collecting data.",
  "Collecting data..",
  "Collecting data...",
  "Cleaning data.",
  "Cleaning data..",
  "Cleaning data...",
  "Running sentiment analyser.",
  "Running sentiment analyser..",
  "Running sentiment analyser...",
  "Predicting sentiment.",
  "Predicting sentiment..",
  "Predicting sentiment...",
  "Drafting line graphs.",
  "Drafting line graphs..",
  "Drafting line graphs...",
  "Generating wordclouds.",
  "Generating wordclouds..",
  "Generating wordclouds...",
  "Generating wordclouds....",
  "Rendering doughnuts.",
  "Rendering doughnuts..",
  "Rendering doughnuts...",
  "Rendering doughnuts....",
  "Rendering doughnuts...",
  "Visualizing dashboard.",
  "Visualizing dashboard..",
  "Visualizing dashboard...",
  "Visualizing dashboard....",
  "Visualizing dashboard.....",
  "Visualizing dashboard.....",
  "Visualizing dashboard.......",
  "Visualizing dashboard........",
  "Visualizing dashboard.........",
  "Visualizing dashboard.........",
  "Visualizing dashboard.........",
  "Visualizing dashboard..........",
];

const LoadingPage = () => {
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prevMessage) => {
        const currentIndex = messages.indexOf(prevMessage);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 800); 

    return () => clearInterval(interval); 
  }, []);

  return (
    <div className="loading-page">
      <div className="loading-spinner"></div>
      <p>{currentMessage}</p>
    </div>
  );
};

export default LoadingPage;
