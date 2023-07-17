import React from "react";
import { BarChart, Bar, CartesianGrid, XAxis, YAxis } from "recharts";
import "../../pages/home/home.scss";
import Data from "../../utils/Data";
import "./chart.scss";

const Histogram = ({ aspect, title }) => {
  const { gallery, fetchGallery } = Data();

  const countResults = () => {
    const resultCounts = gallery.reduce((result, item) => {
      const resultValue = item.result;
      if (resultValue) {
        result[resultValue] = (result[resultValue] || 0) + 1;
      }
      return result;
    }, {});

    const data = Object.entries(resultCounts).map(([result, count]) => ({
      result,
      count,
    }));

    return data;
  };

  const resultData = countResults();

  return (
    <div className="chart">
      <div className="title">{title}</div>
      <BarChart width={800} height={450} data={resultData}>
        <Bar dataKey="count" fill="green" />
        <CartesianGrid stroke="#ccc" />
        <XAxis dataKey="result" />
        <YAxis dataKey="count" />
      </BarChart>
    </div>
  );
};

export default Histogram;
