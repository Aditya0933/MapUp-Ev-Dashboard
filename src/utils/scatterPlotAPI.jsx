export const fetchScatterPlotData = async () => {
    try {
      const response = await fetch(`https://ev-dashboard-b3yr.onrender.com/scatter-plot`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching scatter plot data:", error);
      return null;
    }
  };
  