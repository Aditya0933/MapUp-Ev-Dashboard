export const fetchBarChartData = async (year) => {
    try {
      const response = await fetch(`https://ev-dashboard-b3yr.onrender.com/bar-chart/${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching bar chart data:", error);
      return null;
    }
  };
  