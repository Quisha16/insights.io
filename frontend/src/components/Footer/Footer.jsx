import React from "react";
import "./Footer.css";
import {
  UilTwitter,
  UilGithubAlt,
  UilFacebookF,
} from "@iconscout/react-unicons";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <h3 className="footer-title">Insights.Io</h3>
        <div className="footer-row">
          <div className="footer-column">
            <h3>About Us</h3>
            <p>Lorem ipsum dolor</p>
          </div>
          <div className="footer-column">
            <h3>Terms of Service</h3>
            <p>Lorem ipsum dolor </p>
          </div>
          <div className="footer-column">
            <h3>Privacy Policy</h3>
            <p>Lorem ipsum dolor sit amet</p>
          </div>
          <div className="footer-column">
            <h3>Contact Us</h3>
            <p>Email: info@example.com</p>
            <p>Phone: +123456</p>
          </div>
        </div>
        <div className="footer-social">
          <ul className="social-icons">
            <li>
              <UilTwitter />
            </li>
            <li>
              <UilGithubAlt />
            </li>
            <li>
              <UilFacebookF />
            </li>
          </ul>
        </div>
        <div className="copyright">
          <span>&copy; 2023 Insights.Io All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
