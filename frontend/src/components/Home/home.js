import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UilUploadAlt } from "@iconscout/react-unicons";
import "./home.css";
import LoadingPage from "../LoadingPage/LoadingPage";
import Footer from "../Footer/Footer";

function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      var cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

var csrftoken = getCookie("csrftoken");

const CSRFToken = () => {
  return <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />;
};

const Home = () => {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true); 
    const formData = new FormData();
    formData.append("myfile", uploadedFile);
    formData.append("product_link", event.target.product_link.value);
    const csrftoken = getCookie("csrftoken");

    try {
      const response = await fetch("http://localhost:8000/form_submit/", {
        credentials: "include",
        method: "POST",
        headers: {
          Accept: "application/json",
          "X-CSRFToken": csrftoken,
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const responseData = await response.json();
      console.log(responseData);

      navigate("/dashboard");
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div>
      {isLoading ? (
        <LoadingPage /> 
      ) : (
    <>
    <div className="glass-container">
      <div className="glass-content">
        <div className="logo logo-main">
          <span>
            Insights<span>.io</span>
          </span>
        </div>
        <div className="text-main">
          Unlock the power of your data with INSIGHTS.IO Instantly transform raw
          text into detailed insights and stunning visualizations. Dive deep
          into your data to uncover trends, sentiments, and patterns with ease.
          Elevate your analysis game and make smarter decisions with our
          intuitive platform.
        </div>
        <div className="upload-box">
          <div className="text">Upload CSV File</div>
          <div className="text2">
            Please upload your data in CSV format of the product you'd like to
            analyze.
          </div>
          <form
            method="post"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <CSRFToken />
            <div className="upload-csv">
              <label htmlFor="myfile" className="upload-button">
                <UilUploadAlt className="upload-icon" />
                <input
                  id="myfile"
                  type="file"
                  name="myfile"
                  onChange={handleFileChange}
                  style={{ display: "none" }}
                />
              </label>
              {uploadedFile && (
                <span className="uploaded-file">{uploadedFile.name}</span>
              )}
            </div>
            <div>
            <div className="text text-center">OR</div>{" "}
              <div className="text">Input Product URL</div>{" "}
              <div className="text2">
                Paste a link to the product you'd like to analyze.
              </div>
              <input
                type="text"
                name="product_link"
                placeholder="example: https://www.amazon.in/dp/B07FQ4Q7MB"
              />
            </div>
            <div className="submit">
              <button type="submit" className="submit-button">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </>
         )}
    </div>
  );
};

export default Home;
