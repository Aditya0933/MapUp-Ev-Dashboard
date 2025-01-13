import React, { useState, useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { fetchPieChartData } from "../utils/pieChartAPI";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { FaSpinner } from "react-icons/fa";

ChartJS.register(ArcElement, Tooltip, Legend);

const PieChart = () => {
  const [loading, setLoading] = useState(true);
  const [pieData, setPieData] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchPieChartData();
      setPieData(data);
      setLoading(false);
    };

    loadData();
  }, []);

  const chartData = pieData
    ? {
        labels: Object.keys(pieData),
        datasets: [
          {
            data: Object.values(pieData),
            backgroundColor: ["#42A5F5", "#66BB6A", "#FF7043"], // Customize colors as needed
          },
        ],
      }
    : null;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        Distribution of Electric Vehicle Types (Pie Chart)
      </h1>
      <p className="text-center text-gray-600 mb-6">
        This pie chart displays the distribution of Electric Vehicles (EVs) in our database, 
        categorized into Battery Electric Vehicles (BEV) and Plug-in Hybrid Electric Vehicles (PHEV).
        By visualizing these vehicle types, we can assess the current share of fully electric vehicles 
        versus hybrid ones, which plays a crucial role in understanding the shift towards sustainable 
        transportation in the automotive market.
      </p>

      {loading ? (
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
          <p className="text-gray-600 font-semibold">Loading data, please wait...</p>
        </div>
      ) : chartData ? (
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl">
          <div style={{ height: "400px" }} className="flex justify-center">
            <Pie data={chartData} options={{ responsive: true }} />
          </div>
        </div>
      ) : (
        <p className="text-red-500 font-bold">No data available for the pie chart.</p>
      )}

      <div className="mt-6 p-4 bg-gray-50 border-t border-gray-300 text-gray-700 rounded-lg w-full max-w-3xl">
        <h3 className="text-lg font-bold mb-2">Why is this chart important?</h3>
        <p className="mb-2">
          The distribution of BEVs and PHEVs provides a clear picture of how electric vehicles are 
          being adopted in the market. While BEVs run entirely on electricity, PHEVs combine both 
          electric and gasoline power, providing flexibility and extending range. 
        </p>
        <p className="mb-2">
          As governments push for sustainability and more consumers opt for cleaner alternatives, 
          understanding the distribution of these vehicle types is crucial for manufacturers, policymakers, 
          and consumers. The shift toward EVs is expected to grow as environmental concerns rise, 
          and governments offer incentives for electric vehicle purchases.
        </p>
        <p>
          By analyzing the data, we can determine the growing influence of EVs in the automotive industry, 
          helping inform decisions for future investments, infrastructure, and environmental policies.
        </p>
      </div>
    </div>
  );
};

export default PieChart;