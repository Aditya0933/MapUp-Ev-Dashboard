import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { yearEPfetchData } from "../utils/yearEPapi";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaSpinner } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const ElectricVehicleTypeChart = () => {
  const [year, setYear] = useState(2024); // Default year
  const [yearEPData, setYearEPData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const fetchedData = await yearEPfetchData(year);
      setYearEPData(fetchedData);
      setLoading(false);
    };

    loadData();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const chartData = yearEPData
    ? {
        labels: Object.keys(yearEPData),
        datasets: [
          {
            data: Object.values(yearEPData),
            backgroundColor: ["#FF5733", "#33FF57", "#3357FF"],
            hoverOffset: 4,
          },
        ],
      }
    : null;

  const totalVehicles = yearEPData
    ? Object.values(yearEPData).reduce((acc, val) => acc + val, 0)
    : 0;

  return (
    <div className="flex flex-col items-center p-6  min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Electric Vehicle Type Distribution
      </h1>
      <p className="text-center text-gray-600 mb-6">
        This chart visualizes the distribution of different types of electric vehicles for the selected year. 
        <strong> BEV </strong> stands for <em>Battery Electric Vehicle</em>, and <strong>PHEV</strong> stands for 
        <em> Plug-in Hybrid Electric Vehicle</em>. Select a year to analyze the trends and distribution.
      </p>

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
          <div style={{ height: "400px" }}> {/* Adjusted height */}
            <Pie
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

      <div className="mt-6 p-4 bg-gray-50 border-t border-gray-300 text-gray-700 rounded-lg w-full max-w-3xl">
        <h3 className="text-lg font-bold mb-2">Why is this chart important?</h3>
        <p className="mb-2">
          Electric vehicles play a crucial role in reducing greenhouse gas emissions and 
          combating climate change. By analyzing the distribution of vehicle types like BEVs 
          and PHEVs, we can better understand adoption trends and the market's growth.
        </p>
        <p>
          This information is vital for policymakers, manufacturers, and environmental 
          organizations to make informed decisions about the future of sustainable transportation.
        </p>
      </div>
    </div>
  );
};

export default ElectricVehicleTypeChart;