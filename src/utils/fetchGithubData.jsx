// utils/githubAPI.js
export const fetchGithubData = async () => {
    try {
      const response = await fetch("https://api.github.com/users/Aditya0933");
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching GitHub data:", error);
      return null;
    }
  };
  