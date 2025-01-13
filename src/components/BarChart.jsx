import React, { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { fetchBarChartData } from "../utils/barChartAPI";
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

const BarChart = () => {
  const [year, setYear] = useState(2024); // Default year
  const [yearData, setYearData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      // Hardcoded data to always load
      const hardcodedData = {
        "Toyota": 150,
        "Honda": 130,
        "Ford": 120,
        "Chevrolet": 110,
        "BMW": 90,
      };

      setLoading(true);
      try {
        const data = await fetchBarChartData(year);
        setYearData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Fallback to hardcoded data if fetching fails
        setYearData(hardcodedData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const chartData = yearData
    ? {
        labels: Object.keys(yearData),
        datasets: [
          {
            label: "Number of Vehicles",
            data: Object.values(yearData),
            backgroundColor: "#42A5F5",
          },
        ],
      }
    : null;

  const totalVehicles = yearData
    ? Object.values(yearData).reduce((acc, val) => acc + val, 0)
    : 0;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Vehicle Distribution by Make (Bar Chart)
      </h1>
      <div className="flex justify-center items-center mb-6 w-full">
        <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-md">
          <label htmlFor="year" className="block text-gray-700 font-semibold mb-2">
            Select Year
          </label>
          <select
            id="year"
            value={year}
            onChange={handleYearChange}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            {Array.from({ length: 26 }, (_, index) => 2000 + index).map(
              (yearOption) => (
                <option key={yearOption} value={yearOption}>
                  {yearOption}
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
          <p className="text-gray-600 font-semibold">Loading data, please wait...</p>
        </div>
      ) : chartData ? (
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Total Vehicles: {totalVehicles}
            </h2>
          </div>
          <div style={{ height: "400px" }}>
            <Bar
              data={chartData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: "bottom",
                    labels: {
                      font: { size: 14 },
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-bold">No data available for year {year}.</p>
      )}
    </div>
  );
};

export default BarChart;
