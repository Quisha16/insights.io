import React,  { useState } from 'react';
import './Sidebar.css';
import { SidebarData } from '../../Data/Data';
import { UilSignOutAlt } from "@iconscout/react-unicons";

const Sidebar = () => {
    const [selected, setSelected] = useState(0);
  return (
    <div className="sidebar">
      <div className="logo">
        <span>Insights<span>.io</span></span>
      </div>

      <div className="menu">
        {SidebarData.map((item, index) => {
          return (
            <div className={selected === index ? "menuItem active" : "menuItem"}
                 key={index}
                 onClick={() => setSelected(index)} //onclick set selected to the index of the current.
            >

              <item.icon />
              <span>{item.heading}</span>
            </div>
          );
        })}
        {/* <div className="signout">
            <UilSignOutAlt/>
        </div> */}
      </div>
    </div>
  );
};

export default Sidebar;
