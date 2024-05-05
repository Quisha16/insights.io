import React, { useState } from "react";
import "./Sidebar.css";
import { SidebarData } from "../../Data/Data";
import { UilDownloadAlt } from "@iconscout/react-unicons";
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
const Sidebar = () => {
  const [selected, setSelected] = useState(0);
  return (
    <div className="sidebar">
      <div className="logo">
        <span>
          Insights<span>.io</span>
        </span>
      </div>
      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div
              className={selected === index ? "menuItem active" : "menuItem"}
              key={index}
              onClick={() => setSelected(index)} //onclick set selected to the index of the current.
            >
              <span className="icon-wrapper"><item.icon size="16" /></span>
              <span>{item.heading}</span>
            </div>
          );
        })}
      </div>
      <div className="download-button">
        <UilDownloadAlt onClick={downloadPDF} />
      </div>
    </div>
  );
};

export default Sidebar;
