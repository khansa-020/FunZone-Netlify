import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const CategoryChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/getprojectsbycatgory"
        );
        const data = response.data;
        setChartData({
          labels: ["Game Development", "Digital Arts"],
          datasets: [
            {
              label: data.totalCount,
              data: [data.gameDevCount, data.digitalArtsCount],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(54, 162, 235, 0.2)",
                // "rgba(255, 206, 86, 0.2)",
              ],
              borderColor: [
                "rgba(255, 99, 132, 1)",
                "rgba(54, 162, 235, 1)",
                // "rgba(255, 206, 86, 1)",
              ],
              borderWidth: 1,
            },
          ],
        });
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
        <Bar data={chartData} options={{ responsive: true }} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CategoryChart;
