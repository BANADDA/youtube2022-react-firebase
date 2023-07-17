import React, { useState, useEffect } from 'react';
import {
  LineChart,
  ResponsiveContainer,
  Legend,
  Tooltip,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';
import "./chart.scss";
import Data from '../../../utils/Data';

function DateArea({ aspect, title }) {
  const { gallery, fetchGallery } = Data();

  const [pdata, setPdata] = useState([]);

  useEffect(() => {
    const imageCountsByDate = gallery.reduce((result, item) => {
      if (item.time && item.result) {
        const dateTimeParts = item.time.split('_');
        if (dateTimeParts.length === 2) {
          const [dateString, timeString] = dateTimeParts;
          const dateParts = dateString.split('-');
          const timeParts = timeString.match(/.{2}/g);

          if (dateParts.length === 3 && timeParts && timeParts.length === 3) {
            const day = dateParts[2];
            const month = dateParts[1];
            const year = `${dateParts[0]}-${month}-${day}`;
            const resultType = item.result.trim(); // Trim any whitespace

            if (!result[year]) {
              result[year] = {
                year,
              };
            }

            if (!result[year][resultType]) {
              result[year][resultType] = 0;
            }

            result[year][resultType] += 1;
          }
        }
      }

      return result;
    }, {});

    const pdata = Object.values(imageCountsByDate).map((dateData) => ({
      ...dateData,
    }));

    setPdata(pdata);
  }, [gallery]);

  if (pdata.length === 0) {
    return null; // or render a loading state
  }

  const resultTypes = Array.from(
    new Set(pdata.flatMap((data) => Object.keys(data).filter((key) => key !== 'year')))
  );
  const strokeColors = ['black', 'green', 'orange', 'blue'];
  console.log(pdata)

  return (
    <div className="chart">
      <div className="title text-heading">{title}</div>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart data={pdata} margin={{ right: 300 }}>
          <CartesianGrid />
          <XAxis dataKey="year" interval={'preserveStartEnd'} />
          <YAxis />
          <Legend />
          <Tooltip />
          {resultTypes.map((resultType, index) => (
            <Line
              key={resultType}
              dataKey={resultType}
              stroke={strokeColors[index % strokeColors.length]}
              activeDot={{ r: 8 }}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default DateArea;
