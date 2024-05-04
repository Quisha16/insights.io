import React from 'react';
import { Link } from 'react-router-dom';
import MainContent from './components/MainContent/MainContent';
import Sidebar from './components/Sidebar/Sidebar';
import './App.css';



function DashboardTwo() {
  return (
    <div className="App">
      <div className="AppContainer">
        <Sidebar/>
        <MainContent/>
      </div>
    </div>
  );
}

export default DashboardTwo;

