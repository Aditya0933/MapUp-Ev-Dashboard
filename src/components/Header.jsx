import React, { useState, useEffect } from "react";
import { FaSearch, FaUser, FaBell, FaTimes } from "react-icons/fa"; // Added FaTimes for close icon
import LOGO from "../assets/IMG/mapup-logo.png";
import { LuLayoutDashboard } from "react-icons/lu";
import { fetchGithubData } from "../utils/fetchGithubData"; // Fetch GitHub data

const Header = () => {
  const [githubData, setGithubData] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch the GitHub data when the component mounts
    const loadGithubData = async () => {
      const data = await fetchGithubData();
      if (data) {
        setGithubData(data);
      }
    };
    loadGithubData();
  }, []);

  const handleProfileClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCloseProfile = () => {
    setIsDropdownOpen(false); // Close the dropdown when the close icon is clicked
  };

  return (
    <div>
      <header className="antialiased">
        <nav className="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800">
          <div className="flex flex-wrap justify-between items-center">
            <div className="flex justify-start items-center">
              <LuLayoutDashboard className="text-white text-2xl mr-4" />
              <a href="#" className="flex mr-4">
                <img src={LOGO} className="mr-3 h-8" alt="Logo" />
              </a>
            </div>
            <div>
              <form action="#" method="GET" className="hidden lg:block lg:pl-2">
                <label for="topbar-search" className="sr-only">
                  Search
                </label>
                <div className="relative mt-1 lg:w-96">
                  <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500 dark:text-gray-400"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 20 20"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                      />
                    </svg>
                  </div>
                  <input
                    type="text"
                    name="email"
                    id="topbar-search"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:outline-none block w-full pl-9 p-2.5"
                    placeholder="Search"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center lg:order-2">
              <button
                type="button"
                className="hidden sm:inline-flex items-center justify-center text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-xs px-3 py-1.5 mr-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
              >
                <svg
                  aria-hidden="true"
                  className="mr-1 -ml-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                    clipRule="evenodd"
                  ></path>
                </svg>{" "}
                New Widget
              </button>
              <button
                type="button"
                id="toggleSidebarMobileSearch"
                className="p-2 text-gray-500 rounded-lg lg:hidden hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
              >
                <span className="sr-only">Search</span>
                {/* <!-- Search icon --> */}
                <svg
                  className="w-4 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </button>
              {/* <!-- Notifications --> */}
              <button
                type="button"
                data-dropdown-toggle="notification-dropdown"
                className="p-2 mr-1 text-gray-500 rounded-lg hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
              >
                <span className="sr-only">View notifications</span>
                {/* <!-- Bell icon --> */}
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 14 20"
                >
                  <path d="M12.133 10.632v-1.8A5.406 5.406 0 0 0 7.979 3.57.946.946 0 0 0 8 3.464V1.1a1 1 0 0 0-2 0v2.364a.946.946 0 0 0 .021.106 5.406 5.406 0 0 0-4.154 5.262v1.8C1.867 13.018 0 13.614 0 14.807 0 15.4 0 16 .538 16h12.924C14 16 14 15.4 14 14.807c0-1.193-1.867-1.789-1.867-4.175ZM3.823 17a3.453 3.453 0 0 0 6.354 0H3.823Z" />
                </svg>
              </button>
              {/* <!-- User Profile Dropdown --> */}
              <button
                type="button"
                onClick={handleProfileClick}
                className="flex mx-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                id="user-menu-button"
                aria-expanded={isDropdownOpen ? "true" : "false"}
                data-dropdown-toggle="dropdown"
              >
                <span className="sr-only">Open user menu</span>
                <img
                  className="w-8 h-8 rounded-full"
                  src={githubData ? githubData.avatar_url : "https://flowbite.com/docs/images/people/profile-picture-5.jpg"}
                  alt="user photo"
                />
              </button>
              {isDropdownOpen && githubData && (
                <div className="absolute right-2 z-1000 mt-36 w-64 bg-white shadow-lg rounded-lg p-4 dark:bg-gray-800" style={{ zIndex: 1000 }}>
                  <button
                    onClick={handleCloseProfile}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                  >
                    <FaTimes className="w-5 h-5" />
                  </button>
                  <div className="flex items-center">
                    <img
                      className="w-12 h-12 rounded-full"
                      src={githubData.avatar_url}
                      alt="GitHub Avatar"
                    />
                    <div className="ml-3">
                      <h4 className="text-lg font-semibold text-gray-800 dark:text-white">
                        {githubData.name}
                      </h4>
                      <a
                        href={githubData.html_url}
                        className="text-blue-600 dark:text-blue-400 text-sm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {githubData.login}
                      </a>
                    </div>
                  </div>
                  <div className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <p>Followers: {githubData.followers}</p>
                    <p>Following: {githubData.following}</p>
                    <p>Public Repos: {githubData.public_repos}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Header;
