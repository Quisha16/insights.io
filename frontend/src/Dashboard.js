import React, { useEffect } from "react";
import MainContent from "./components/MainContent/MainContent";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import "./App.css";

function Dashboard() {
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://localhost:8000/dashboard/");
      const responseData = await response.json();
      console.log(responseData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className="App">
      <div className="AppContainer">
        <Sidebar />
        <MainContent />
      </div>
      <Footer />
    </div>
  );
}

export default Dashboard;
