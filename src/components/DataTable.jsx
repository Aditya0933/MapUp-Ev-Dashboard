import { useState, useEffect } from "react";
import { FaSpinner, FaTimesCircle } from "react-icons/fa";
import { MdInsights } from "react-icons/md";
import { CgInsights } from "react-icons/cg";
import { FcStatistics } from "react-icons/fc";

const DataTable = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});
  const [mapCoordinates, setMapCoordinates] = useState(null);

  const fetchData = async (page) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://ev-dashboard-b3yr.onrender.com/data?page=${page}&limit=10`
      );
      const result = await response.json();
      setData(result.data || []);
      setTotalPages(result.totalPages || 0);
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page);
  }, [page]);

  const columns = data.length > 0 ? Object.keys(data[0]) : [];

  const handleCellClick = (item) => {
    setModalData(item);
    
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setMapCoordinates(null);
  };

  const extractCoordinates = (value) => {
    const match = value.match(/\((-?\d+(\.\d+)?)\s(-?\d+(\.\d+)?)\)/);
    return match
      ? { lat: parseFloat(match[3]), lng: parseFloat(match[1]) }
      : null;
  };

  const handleViewLocation = (value) => {
    const coordinates = extractCoordinates(value);
    if (coordinates) {
      setMapCoordinates(coordinates);
      setShowModal(true);
    }
  };

  return (
    <div className="">
      <h1 className="text-3xl font-bold mb-6">
        MapUp - EV Analytics Dashboard
      </h1>

      {/* Hardcoded Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 -z-100">
        {/* Key Insights Card */}
        <div className="bg-gradient-to-br from-indigo-500 to-purple-500 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 -z-100">
          <div className="flex items-center mb-4">
            <MdInsights className="text-3xl text-white mr-3" />
            <h3 className="text-xl font-bold text-white">Key Insights</h3>
          </div>
          <ul className="list-disc list-inside text-white">
            <li>BEVs dominate with a 70% market share.</li>
            <li>Continuous growth in EV sales globally.</li>
            <li>Innovative EV models are on the rise.</li>
          </ul>
        </div>

        {/* Statistics Card */}
        <div className="bg-gradient-to-br from-green-500 to-teal-500 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300">
          <div className="flex items-center mb-4">
            <CgInsights className="text-3xl text-white mr-3" />
            <h3 className="text-xl font-bold text-white">Statistics</h3>
          </div>
          <p className="text-white">
            <span className="font-bold">1,500+</span> vehicles analyzed, with{" "}
            <span className="font-bold">75%</span> being BEVs.
          </p>
        </div>

        {/* Trends Card */}
        <div className="bg-gradient-to-br from-orange-500 to-yellow-500 p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition duration-300 -z-100">
          <div className="flex items-center mb-4">
            <FcStatistics className="text-3xl text-white mr-3" />
            <h3 className="text-xl font-bold text-white">Trends</h3>
          </div>
          <ul className="list-disc list-inside text-white">
            <li>20% increase in EV sales expected by 2025.</li>
            <li>Global investment in EV infrastructure soaring.</li>
          </ul>
        </div>
      </div>

      {/* Electric Vehicle Population Section */}
      <div className="p-6 rounded-lg mx-auto mt-8">
        <h1 className="text-4xl font-semibold text-gray-800 mb-4">
          Electric Vehicle Population Data
        </h1>
        <p className="text-gray-600 text-base leading-relaxed">
          My dataset is about the development of electric vehicles in your
          world, currently.
        </p>
      </div>

      {/* About Dataset Section */}
      <div className="p-6 rounded-lg mx-auto mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          About Dataset
        </h2>
        <p className="text-gray-600 text-base leading-relaxed">
          BEV sales during Q2 2023 grew over 50% YoY. One in every 10 cars sold
          during Q2 2023 was a pure battery electric vehicle (BEV). China
          remained the leader in global BEV sales followed by the USA and
          Germany. BEV sales in the USA grew by almost 57% YoY, the highest
          among the top 3 EV markets.
        </p>
      </div>

      {/* Table Section */}
      <div className="overflow-x-scroll scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack scrollbar-thumb-rounded scrollbar-track-rounded max-h-96">
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr className="sticky top-0 bg-gray-100 z-1">
              {columns.map((col, index) => (
                <th key={index} className="border px-4 py-2 whitespace-nowrap">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="overflow-y-auto scrollbar-thin scrollbar-thumb-scrollbarThumb scrollbar-track-scrollbarTrack scrollbar-rounded">
            {loading ? (
              <div className="h-64 w-full flex justify-center items-center">
                <FaSpinner className="animate-spin text-blue-500 text-4xl mb-4" />
              </div>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="text-center py-4">
                  No data available
                </td>
              </tr>
            ) : (
              data.map((item, index) => (
                <tr key={index}>
                  {/* View Details Button in First Column */}
                  <td className="border px-2 pt-2 text-sm font-normal cursor-pointer">
                    <button
                      className="bg-blue-500 text-white px-2 py-1 rounded"
                      onClick={() => handleCellClick(item)}
                    >
                      View Details
                    </button>
                  </td>

                  {columns.slice(1).map((col, idx) => {
                    const value = item[col];
                    const isPoint = value && value.startsWith("POINT");

                    return (
                      <td
                        key={idx}
                        className="border px-2 pt-2 text-sm font-normal cursor-pointer"
                        onClick={
                          isPoint ? undefined : () => handleCellClick(item)
                        }
                      >
                        {isPoint ? (
                          <button
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                            onClick={() => handleViewLocation(value)}
                          >
                            View Location
                          </button>
                        ) : (
                          value || "N/A"
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 backdrop-blur-md">
          <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-2xl relative transform scale-95 transition-all hover:scale-100">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-900">
                {mapCoordinates ? "Vehicle Location" : "Vehicle Details"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="text-2xl text-gray-500 hover:text-gray-900 transition-colors"
              >
                <FaTimesCircle />
              </button>
            </div>

            {mapCoordinates ? (
              <iframe
                src={`https://www.google.com/maps?q=${mapCoordinates.lat},${mapCoordinates.lng}&output=embed`}
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
              ></iframe>
            ) : (
              <div className="grid grid-cols-2 space-y-2 gap-4 text-gray-700">
                {Object.entries(modalData).map(([key, value], index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between"
                  >
                    <span className="font-medium text-gray-900">{key}:</span>
                    <span className="text-gray-600">{value || "N/A"}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      <div className="flex justify-between mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={page === 1}
        >
          Previous
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={page === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default DataTable;
