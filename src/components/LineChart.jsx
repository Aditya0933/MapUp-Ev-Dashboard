import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchLineChartData } from "../utils/lineChartAPI";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaSpinner } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = () => {
  const [loading, setLoading] = useState(true);
  const [lineData, setLineData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchLineChartData();
      setLineData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  const chartData = lineData
    ? {
        labels: Object.keys(lineData),
        datasets: [
          {
            label: "Number of Vehicles",
            data: Object.values(lineData),
            borderColor: "#42A5F5",
            fill: false,
          },
        ],
      }
    : null;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Number of Vehicles by Year (Line Chart)
      </h1>
      <p className="text-center text-gray-600 mb-6">
        This line chart tracks the number of vehicles across different years, 
        providing insights into the growth or decline in vehicle population over time. 
        By visualizing this trend, we can observe the impact of market factors on the vehicle industry.
      </p>

      {loading ? (
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
          <p className="text-gray-600 font-semibold">Loading data, please wait...</p>
        </div>
      ) : chartData ? (
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl">
          <div style={{ height: "400px" }}>
            <Line data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-bold">No data available for the line chart.</p>
      )}

      <div className="mt-6 p-4 bg-gray-50 border-t border-gray-300 text-gray-700 rounded-lg w-full max-w-3xl">
        <h3 className="text-lg font-bold mb-2">Why is this chart important?</h3>
        <p className="mb-2">
          Tracking the number of vehicles over time provides valuable insights into trends and 
          growth in the industry. It helps manufacturers and analysts predict future demand, 
          plan production, and make informed decisions based on historical patterns.
        </p>
        <p>
          By visualizing these trends, we can better understand the impact of different factors 
          such as economic conditions, regulatory changes, and technological advancements on vehicle 
          adoption and market share.
        </p>
      </div>
    </div>
  );
};

export default LineChart;
