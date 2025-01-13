export const fetchStackedBarChartData = async () => {
    try {
      const response = await fetch(`https://ev-dashboard-b3yr.onrender.com/stacked-bar-chart`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
  
      // Console log the response data for debugging
      console.log("Fetched data:", data);
  
      return data;
    } catch (error) {
      console.error("Error fetching stacked bar chart data:", error);
      return null;
    }
  };  