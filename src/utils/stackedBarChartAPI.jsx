export const fetchStackedBarChartData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/stacked-bar-chart`);
      
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