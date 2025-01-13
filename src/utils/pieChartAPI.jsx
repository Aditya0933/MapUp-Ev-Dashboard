export const fetchPieChartData = async () => {
    try {
      const response = await fetch(`https://ev-dashboard-b3yr.onrender.com/pie-chart`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pie chart data:", error);
      return null;
    }
  };
  