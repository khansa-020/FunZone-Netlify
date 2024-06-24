import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const ProjectsChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/getprojectscreatedpermonth"
        );
        const data = response.data;

        // Group data by month and year
        const groupedData = data.reduce((acc, entry) => {
          const month = entry._id.month;
          const year = entry._id.year;
          const key = `${year}-${month}`;
          if (acc[key]) {
            acc[key] += entry.count;
          } else {
            acc[key] = entry.count;
          }
          return acc;
        }, {});

        // Convert grouped data to chart data format
        const dateLabels = Object.keys(groupedData).map((key) => {
          const [year, month] = key.split("-");
          const monthYear = new Date(year, month - 1).toLocaleDateString(
            undefined,
            { year: "numeric", month: "long" }
          );
          return monthYear;
        });

        setChartData({
          labels: dateLabels,
          datasets: [
            {
              label: "Projects Created",
              data: Object.values(groupedData),
              fill: false,
              backgroundColor: "#fbc0bc",
              borderColor: "#da96e9",
            },
          ],
        });
        console.log(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <div className="chart">
      {/* <h2>Projects Created Per Month</h2> */}
      {chartData.labels && chartData.datasets ? (
        <Line data={chartData} options={{ responsive: true }} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default ProjectsChart;
