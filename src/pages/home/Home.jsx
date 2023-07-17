import React, { useState } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import MultiActionAreaCard from "./card";

const Home = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="home">
      {isOpen && <Sidebar />}
      <div className="homeContainer">
        <Navbar toggleSidebar={toggleSidebar} />
        <div className="widgets">
          <Widget type="user" link="/users" />
          <Widget type="order" link="/products" />
          <Widget type="earning" link="/stats" />
        </div>
        <div className="charts">
          <MultiActionAreaCard />
          {/* <Featured />
          <Chart title="Last 2 Months Registration" aspect={2 / 1} /> */}
        </div>
      </div>
    </div>
  );
};

export default Home;
