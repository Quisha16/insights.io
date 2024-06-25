import React, { useState, useRef } from "react";
import "./Sidebar.css";
import { Link } from "react-router-dom";
import { SidebarData } from "../../Data/Data";
import { UilDownloadAlt } from "@iconscout/react-unicons";
import jsPDF from "jspdf";


const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  const chartElementsRef = useRef([]);
  
    
  const headerTexts = ["Product Performance Overtime", "Customer Ratings", "Sentiment Prediction Score", 
  "Ratio of Positive and Negative Sentiments Overtime", "Top Issues"];

  function downloadPDF() {

    const doc = new jsPDF();
    const canvasElements = document.querySelectorAll(".chart-element canvas");
    const canvasList = Array.from(canvasElements);
    canvasList.forEach((canvas, index) => {
      if (index > 0) {
        doc.addPage();
      }
      const imgData = canvas.toDataURL("image/jpeg");
      doc.addImage(imgData, "JPEG", 15, 15, 150, 130);
      if (headerTexts && headerTexts[index]) {
        doc.setFontSize(12);
        doc.text(headerTexts[index], 15, 10);
      }
    });
    doc.save("charts.pdf");
  }


  return (
    <div className="sidebar">
      <div className="logo">
        <span>
          Insights<span>.io</span>
        </span>
      </div>
      <div className="menu">
        {SidebarData.map((item, index) => (
          <Link
            to={item.path}
            key={index}
            className={selected === index ? "menuItem active" : "menuItem"}
            onClick={() => setSelected(index)}
          >
            <span className="icon-wrapper"><item.icon size="16" /></span>
            <span>{item.heading}</span>
          </Link>
        ))}
      </div>
      <div className="download-button">
        <UilDownloadAlt onClick={downloadPDF} />
      </div>
    </div>
  );
};

export default Sidebar;
