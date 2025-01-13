import { useState } from "react";
import { FaHome, FaChartLine, FaChartBar, FaCog } from "react-icons/fa";
import { IoIosArrowDown, IoIosArrowDroprightCircle } from "react-icons/io";
import { MdOutlinePieChart } from "react-icons/md"; // New icon for chart
import { AiOutlineLineChart } from "react-icons/ai"; // New icon for chart

const Sidebar = ({ setSelectedView }) => {
  // Accept function as prop
  const [sidenavbar, setSidenavbar] = useState(true);

  const closeSideNavBar = () => {
    setSidenavbar(!sidenavbar);
  };

  const toggleSubList = () => {
    // Get the sublist element(s)
    const sublist = document.getElementsByClassName("sublist")[0]; // Access the first sublist element

    // Check if the sublist is already open or closed
    if (sublist) {
      if (sublist.style.maxHeight === "0px" || sublist.style.maxHeight === "") {
        // Open the sublist
        sublist.style.maxHeight = "300px"; // Adjust max-height as needed
        sublist.style.opacity = "1";
        sublist.style.transition = "all 0.3s ease-in-out"; // Smooth transition
      } else {
        // Close the sublist
        sublist.style.maxHeight = "0px"; // Hide the sublist
        sublist.style.opacity = "0"; // Make it invisible
      }
    }
  };

  return (
    <div className="h-screen max-w-64 bg-gray-800 text-white relative">
      <div className="bg-gray-800 p-2 rounded-full absolute top-[40%] -right-[50px] transform -translate-x-1/2 -translate-y-1/2">
        <IoIosArrowDroprightCircle
          className="text-white text-[35px] cursor-pointer"
          onClick={closeSideNavBar}
        />
      </div>
      <ul className="space-y-2 relative">
        <li className="px-8">
          <ul className="relative">
            {/* Each List Item with icon */}
            <li className="py-2 flex items-center justify-between space-x-2 cursor-pointer">
              <div
                className="flex gap-2"
                onClick={() => setSelectedView("EVDataDashboard")}
              >
                <FaHome className="text-white text-2xl" />
                {sidenavbar ? (
                  <button className="w-full text-left whitespace-nowrap">
                    EV Data Dashboard
                  </button>
                ) : (
                  <button></button>
                )}
              </div>
              <div>
                <IoIosArrowDown
                  className="text-[18px]"
                  onClick={toggleSubList}
                />
              </div>
            </li>
            <li className="sublist">
              <ul>
                <li
                  className="py-2 pl-7 flex items-center space-x-2 cursor-pointer"
                  onClick={() => setSelectedView("AnalyticsChart1")}
                >
                  <AiOutlineLineChart className="text-white text-2xl" />
                  {sidenavbar ? (
                    <button className="w-full text-left whitespace-nowrap">
                      Analytics Chart 1
                    </button>
                  ) : (
                    <button></button>
                  )}
                </li>
                <li
                  className="py-2 pl-7 flex items-center space-x-2 cursor-pointer"
                  onClick={() => setSelectedView("AnalyticsChart2")}
                >
                  <MdOutlinePieChart className="text-white text-2xl" />
                  {sidenavbar ? (
                    <button className="w-full text-left whitespace-nowrap">
                      Analytics Chart 2
                    </button>
                  ) : (
                    <button></button>
                  )}
                </li>
                <li
                  className="py-2 pl-7 flex items-center space-x-2 cursor-pointer"
                  onClick={() => setSelectedView("AnalyticsChart3")}
                >
                  <FaChartBar className="text-white text-2xl" />
                  {sidenavbar ? (
                    <button className="w-full text-left whitespace-nowrap">
                      Analytics Chart 3
                    </button>
                  ) : (
                    <button></button>
                  )}
                </li>
                <li
                  className="py-2 pl-7 flex items-center space-x-2 cursor-pointer"
                  onClick={() => setSelectedView("AnalyticsChart4")}
                >
                  <FaChartBar className="text-white text-2xl" />
                  {sidenavbar ? (
                    <button className="w-full text-left whitespace-nowrap">
                      Analytics Chart 4
                    </button>
                  ) : (
                    <button></button>
                  )}
                </li>
                <li
                  className="py-2 pl-7 flex items-center space-x-2 cursor-pointer"
                  onClick={() => setSelectedView("AnalyticsChart5")}
                >
                  <FaChartLine className="text-white text-2xl" />
                  {sidenavbar ? (
                    <button className="w-full text-left whitespace-nowrap">
                      Analytics Chart 5
                    </button>
                  ) : (
                    <button></button>
                  )}
                </li>
                <li
                  className="py-2 pl-7 flex items-center space-x-2 cursor-pointer"
                  onClick={() => setSelectedView("AnalyticsChart6")}
                >
                  <FaChartBar className="text-white text-2xl" />
                  {sidenavbar ? (
                    <button className="w-full text-left whitespace-nowrap">
                      Analytics Chart 6
                    </button>
                  ) : (
                    <button></button>
                  )}
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li
          className="py-2 px-8 flex items-center space-x-2 cursor-pointer"
          onClick={() => setSelectedView("comingSoon")}
        >
          <FaCog className="text-white text-2xl" />
          {sidenavbar ? (
            <button className="w-full text-left whitespace-nowrap">
              Comming Soon
            </button>
          ) : (
            <button></button>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;