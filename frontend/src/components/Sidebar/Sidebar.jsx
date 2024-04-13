import React,  { useState } from 'react';
import './Sidebar.css';
import { SidebarData } from '../../Data/Data';
import { UilSignOutAlt } from "@iconscout/react-unicons";
const Sidebar = () => {
    const [selected, setSelected] = useState(0);
  return (
   <div className="Sidebar">
    <div className="logo">
            <span>Insights<span>.io</span></span>
    </div>
    
    {/*menu*/}
    <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div className={selected === index ? "menuItem active" : "menuItem"}
            key={index}
            //onclick set selected to the index of the current.
            onClick={() => setSelected(index)}
            >
                
              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        <div className="menuItem">
            <UilSignOutAlt/>
        </div>
    </div>
    </div>
  );
};

export default Sidebar;
