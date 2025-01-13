import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  PointElement,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ElectricRangeChart = ({ data }) => {
  const rangeData = data.reduce((acc, vehicle) => {
    const range = vehicle["Electric Range"];
    acc.push(range);
    return acc;
  }, []);

  const chartData = {
    labels: Array(rangeData.length).fill("Vehicle"),
    datasets: [
      {
        label: "Electric Range",
        data: rangeData,
        backgroundColor: "#FF9100",
        borderColor: "#FF5722",
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2>Electric Range of Vehicles</h2>
      <Bar data={chartData} />
    </div>
  );
};

export default ElectricRangeChart;
