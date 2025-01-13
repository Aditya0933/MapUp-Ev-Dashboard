export const fetchLineChartData = async () => {
    try {
      const response = await fetch(`https://ev-dashboard-b3yr.onrender.com/line-chart`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching line chart data:", error);
      return null;
    }
  };
  