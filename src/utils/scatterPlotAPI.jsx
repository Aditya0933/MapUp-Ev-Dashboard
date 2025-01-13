export const fetchScatterPlotData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/scatter-plot`);
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
  