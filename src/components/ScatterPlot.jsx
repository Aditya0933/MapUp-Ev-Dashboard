import React, { useState, useEffect } from "react";
import { Scatter } from "react-chartjs-2";
import { fetchScatterPlotData } from "../utils/scatterPlotAPI";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { FaSpinner } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const ScatterPlot = () => {
  const [loading, setLoading] = useState(true);
  const [scatterData, setScatterData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchScatterPlotData();
      setScatterData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  const chartData = scatterData
    ? {
        datasets: [
          {
            label: "Electric Range vs Base MSRP",
            data: scatterData,
            backgroundColor: "#42A5F5",
            pointRadius: 5,
          },
        ],
      }
    : null;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Electric Range vs Base MSRP (Scatter Plot)
      </h1>

      {loading ? (
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
          <p className="text-gray-600 font-semibold">Loading data, please wait...</p>
        </div>
      ) : chartData ? (
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl">
          <div style={{ height: "400px" }}>
            <Scatter data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-bold">No data available for the scatter plot.</p>
      )}
    </div>
  );
};

export default ScatterPlot;
