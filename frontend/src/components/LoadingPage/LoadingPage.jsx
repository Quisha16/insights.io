import React from "react";
import "./LoadingPage.css"; 

const LoadingPage = () => {
  return (
    <div className="loading-page">
      <div className="loading-spinner"></div>
      <p>Loading... Please wait.</p>
    </div>
  );
};

export default LoadingPage;
