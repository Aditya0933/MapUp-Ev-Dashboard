import { useEffect, useState } from "react";
import { fetchData } from "../utils/api";
import Sidebar from "./Sidebar";
import LineChart from "./LineChart";
import DataTable from "./DataTable";
import Header from "./Header";
import Footer from "./Footer";
import EVCharts from "./EVCharts";
import ElectricVehicleTypeChart from "./ElectricVehicleTypeChart";
import ModelYearChart from "./ModelYearChart";
import BarChart from "./BarChart";
import PieChart from "./PieChart";
import StackedBarChart from "./StackedBarChart";
import LineChart2 from "./LineChart2";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedView, setSelectedView] = useState("mainData");

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const response = await fetchData();
      setData(response);
      setLoading(false);
    };

    loadData();
  }, []);

  const renderContent = () => {
    switch (selectedView) {
      case "AnalyticsChart1":
        return <BarChart />;
      case "AnalyticsChart2":
        return <ElectricVehicleTypeChart />;
      case "AnalyticsChart3":
        return <LineChart />;
      case "AnalyticsChart4":
        return <LineChart2/>;
      case "AnalyticsChart5":
        return <ModelYearChart />;
      case "AnalyticsChart6":
        return <PieChart />;
      case "EVDataDashboard":
      default:
        return loading ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-lg text-gray-500">Loading data, please wait...</p>
          </div>
        ) : (
          <DataTable data={data} />
        );
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar setSelectedView={setSelectedView} className="w-64" />
        <div className="flex-grow p-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">

          {renderContent()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Dashboard;