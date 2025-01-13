export const fetchLineChartData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/line-chart`);
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
  