export const fetchModelYearData = async (year) => {
    try {
      // Update URL to match the correct backend route
      const response = await fetch(`http://localhost:3001/model-year-make/${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching model year data:", error);
      return null;
    }
  };  