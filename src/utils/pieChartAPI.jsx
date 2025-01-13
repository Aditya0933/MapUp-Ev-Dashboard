export const fetchPieChartData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/pie-chart`);
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
  