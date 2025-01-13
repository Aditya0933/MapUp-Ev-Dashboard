// src/components/Charts/LineChart2.js
import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { FaSpinner } from "react-icons/fa";
import { fetchLineChartData } from "../utils/lineChartAPI"; // Custom API function for fetching data

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const LineChart2 = () => {
  const [year, setYear] = useState(2024); // Default year
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
        const fallbackData = [
            { label: "1998", value: 45 },
            { label: "2001", value: 60 },
            { label: "2005", value: 75 },
            { label: "2008", value: 90 },
            { label: "2010", value: 120 },
            { label: "2012", value: 140 },
            { label: "2014", value: 160 },
            { label: "2016", value: 180 },
            { label: "2017", value: 200 },
            { label: "2018", value: 230 },
            { label: "2019", value: 260 },
            { label: "2020", value: 290 },
            { label: "2022", value: 310 },
            { label: "2024", value: 350 },
            { label: "2025", value: 400 },
          ];          

      setLoading(true);
      try {
        const data = await fetchLineChartData(year);
        setChartData(data.length ? data : fallbackData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setChartData(fallbackData);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [year]);

  const handleYearChange = (e) => {
    setYear(e.target.value);
  };

  const dataForChart = {
    labels: chartData ? chartData.map((item) => item.label) : ["No Data"],
    datasets: [
      {
        label: "EV Population",
        data: chartData ? chartData.map((item) => item.value) : [0],
        borderColor: "#34D399",
        backgroundColor: "rgba(52, 211, 153, 0.2)",
        borderWidth: 1,
      },
    ],
  };

  const totalPopulation = chartData
    ? chartData.reduce((acc, item) => acc + item.value, 0)
    : 0;

  return (
    <div className="flex flex-col items-center p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-center text-gray-800">
        EV Population Over Time
      </h1>
      <p className="text-center text-gray-600 mb-6">
        This line chart visualizes the growth in EV population over selected years.
        It helps in understanding the adoption trends and market dynamics.
      </p>

      {loading ? (
        <div className="flex flex-col items-center">
          <FaSpinner className="animate-spin text-green-500 text-4xl mb-4" />
          <p className="text-gray-600 font-semibold">Loading data, please wait...</p>
        </div>
      ) : (
        <div className="w-full max-w-3xl p-6 bg-white rounded-lg shadow-xl">
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-gray-800">
              Total Population: {totalPopulation}
            </h2>
          </div>
          <div style={{ height: "400px" }}>
            <Line
              data={dataForChart}
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

      <div className="mt-6 p-4 bg-gray-50 border-t border-gray-300 text-gray-700 rounded-lg w-full max-w-3xl">
        <h3 className="text-lg font-bold mb-2">Why is this chart important?</h3>
        <p className="mb-2">
          Understanding EV population growth trends is crucial for assessing market readiness,
          infrastructure needs, and consumer adoption rates. This data supports strategic decisions
          for manufacturers, policymakers, and investors.
        </p>
        <p>
          By analyzing these trends, stakeholders can predict future demand and align their strategies
          with the rapidly evolving EV market.
        </p>
      </div>
    </div>
  );
};

export default LineChart2;