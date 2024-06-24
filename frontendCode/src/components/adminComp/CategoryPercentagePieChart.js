import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import axios from "axios";
import Chart from "chart.js/auto";
import "chartjs-adapter-date-fns";
import { CategoryScale } from "chart.js";

Chart.register(CategoryScale);

const CategoryPercentagePieChart = () => {
  const [chartData, setChartData] = useState({});

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/admin/getprojectsbycatgorypercentage"
        );
        const data = response.data;
        setChartData({
          labels: data.map((entry) => entry.category), // array of category names
          datasets: [
            {
              data: data.map((entry) => entry.percentage), // array of category percentages
              backgroundColor: ["#e01a49", "#b6b9f9"],
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
    <div className="chart" style={{ maxWidth: "500px", maxHeight: "338px" }}>
      <h2>Total percentage of Projects Created</h2>
      {chartData.labels && chartData.datasets ? (
        <Pie data={chartData} options={{ responsive: true }} />
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};

export default CategoryPercentagePieChart;
