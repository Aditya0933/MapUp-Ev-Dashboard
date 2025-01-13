import React from 'react';
import { Chart as ChartJS, BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';

// Register required components
ChartJS.register(BarElement, ArcElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

// Sample data for demonstration
const sampleData = {
  vehicleCountByYear: {
    labels: ['2016', '2017', '2018', '2019', '2020', '2021', '2022', '2023'],
    data: [50, 100, 200, 300, 400, 500, 600, 700],
  },
  vehicleTypeDistribution: {
    labels: ['BEV', 'PHEV'],
    data: [70, 30],
  },
};

const EVCharts = () => {
  const vehicleCountByYearData = {
    labels: sampleData.vehicleCountByYear.labels,
    datasets: [
      {
        label: 'Vehicle Count by Year',
        data: sampleData.vehicleCountByYear.data,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const vehicleTypeDistributionData = {
    labels: sampleData.vehicleTypeDistribution.labels,
    datasets: [
      {
        data: sampleData.vehicleTypeDistribution.data,
        backgroundColor: ['#FF6384', '#36A2EB'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB'],
      },
    ],
  };

  return (
    <div>
      <h2>EV Data Visualization</h2>
      
      {/* Bar Chart */}
      <div style={{ width: '600px', margin: '20px auto' }}>
        <Bar data={vehicleCountByYearData} options={{ responsive: true }} />
      </div>
      
      {/* Pie Chart */}
      <div style={{ width: '400px', margin: '20px auto' }}>
        <Pie data={vehicleTypeDistributionData} options={{ responsive: true }} />
      </div>

      {/* Line Chart */}
      <div style={{ width: '600px', margin: '20px auto' }}>
        <Line data={vehicleCountByYearData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default EVCharts;