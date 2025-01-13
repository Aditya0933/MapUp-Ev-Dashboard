import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { fetchStackedBarChartData } from "../utils/stackedBarChartAPI";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaSpinner } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const StackedBarChart = () => {
  const [loading, setLoading] = useState(true);
  const [stackedBarData, setStackedBarData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchStackedBarChartData();
      console.log("Fetched data:", data); // Debugging: Check the API response
      setStackedBarData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  // Ensure valid data structure before using Object.keys
  const chartData = stackedBarData && Array.isArray(stackedBarData) && stackedBarData.length > 0
    ? {
        labels: Object.keys(stackedBarData[0]), // Use the first item for the labels
        datasets: Object.keys(stackedBarData[0]).map((make) => ({
          label: make,
          data: stackedBarData.map((item) => item[make] || 0), // Fallback to 0 if key doesn't exist
          backgroundColor: "#42A5F5",
        })),
      }
    : null;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Vehicle Distribution by Make and Year (Stacked Bar Chart)
      </h1>

      {loading ? (
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
          <p className="text-gray-600 font-semibold">Loading data, please wait...</p>
        </div>
      ) : chartData ? (
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl">
          <div style={{ height: "400px" }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                  x: {
                    stacked: true,
                  },
                  y: {
                    stacked: true,
                  },
                },
                plugins: {
                  legend: {
                    position: "bottom",
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-bold">No data available for the stacked bar chart.</p>
      )}
    </div>
  );
};

export default StackedBarChart;