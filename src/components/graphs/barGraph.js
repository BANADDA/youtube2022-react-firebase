import React from 'react';
import Sidebar from '../sidebar/Sidebar';
import Navbar from '../navbar/Navbar';
import "../../pages/home/home.scss"
import Histogram from "./histogram"
import DateArea from "./datearea/DataArea"
import "./home.scss";

const PieChart = () => {
 
    return (
      <div className="home" style={{ backgroundColor: "white" }} >
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
        <div className="charts">
          <Histogram title="Disease category distribution" aspect={2 / 1} />
          </div>
          
        <div className="charts">
          <DateArea title="Data amount collected per month" aspect={2 / 1} />
          </div>
        </div></div>
    );
}
 
export default PieChart;