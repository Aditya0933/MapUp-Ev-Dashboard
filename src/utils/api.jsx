export const fetchData = async () => {
  try {
    const response = await fetch('https://ev-dashboard-b3yr.onrender.com/data');
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const result = await response.json();
    // console.log('Full response:', result); // Log the entire response
    // console.log('Extracted data:', result.data); // Log the specific data

    return result.data; // Adjust this based on the actual response structure
  } catch (error) {
    console.error('Error fetching data:', error);
    return null; // Return null or handle error as needed
  }
}; 