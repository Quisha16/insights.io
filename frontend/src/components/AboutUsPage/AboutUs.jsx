import Sidebar from "../Sidebar/Sidebar";
import Footer from "../Footer/Footer";
import React from "react";
import "./about.css";

const AboutUs = () => {
    return (
        <div className="about-us">
        <Sidebar/>
        <div className="about-us-container">
          <h1>The Team</h1>
          <ul>
          <li>
            <a href="https://www.linkedin.com/in/harsha-deshpande/" target="_blank" rel="noopener noreferrer">
              HARSHA DESHPANDE
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/lizzencamelo/" target="_blank" rel="noopener noreferrer">
              LIZZEN CAMELO
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/kanchan-patil-a37087200/" target="_blank" rel="noopener noreferrer">
              KANCHAN PATIL
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/in/quisha-coutinho-013ba720a/" target="_blank" rel="noopener noreferrer">
              QUISHA COUTINHO
            </a>
          </li>
        </ul>
        </div>
          <Footer/>
        </div>
      );
};

export default AboutUs;

