import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { fetchModelYearData } from "../utils/modelYearAPI";
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

// Generate fallback data dynamically
const generateFallbackData = () => {
  const data = {};
  for (let year = 2000; year <= 2025; year++) {
    data[year] = Math.floor(Math.random() * 200) + 50; // Random values between 50 and 250
  }
  return data;
};

const ModelYearChart = () => {
  const [yearData, setYearData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [useFallback, setUseFallback] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const data = await fetchModelYearData();
        if (data) {
          setYearData(data);
          setUseFallback(false);
        } else {
          throw new Error("No data fetched");
        }
      } catch (error) {
        console.error("Error fetching data. Using fallback data.", error);
        setYearData(generateFallbackData());
        setUseFallback(true);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const chartData = {
    labels: Object.keys(yearData || {}),
    datasets: [
      {
        label: "Number of Vehicles",
        data: Object.values(yearData || {}),
        borderColor: "#42A5F5",
        fill: false,
      },
    ],
  };

  const totalVehicles = yearData
    ? Object.values(yearData).reduce((acc, val) => acc + val, 0)
    : 0;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Vehicle Distribution by Model Year
      </h1>

      {loading ? (
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
          <p className="text-gray-600 font-semibold">Loading data, please wait...</p>
        </div>
      ) : (
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              {useFallback
                ? "Fallback Data (Randomized)"
                : "Data Fetched from Backend"}
            </h2>
            <p className="text-gray-600">Total Vehicles: {totalVehicles}</p>
          </div>
          <div style={{ height: "400px" }}>
            <Line
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
      )}
    </div>
  );
};

export default ModelYearChart;
