export const yearEPfetchData = async (year) => {
    try {
      const response = await fetch(`https://ev-dashboard-b3yr.onrender.com/data/by-year?year=${year}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const result = await response.json();
      
      return result; // Adjust based on actual API structure
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  