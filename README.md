# MapUp - EV Analytics Dashboard

This project is a comprehensive Electric Vehicle (EV) analytics dashboard built with React. It consists of a **frontend** and **backend** to display and manage EV-related data.

### Project Structure
- **`ev-dashboard-frontend`**: The React-based frontend.
- **`ev-dashboard-backend`**: The backend, built with Node.js, for processing large datasets (approximately 50,000 entities) from CSV files and sending the data to the frontend.

### Features
- **Data Visualization**: The frontend includes different types of graphs created using Chart.js, which show the relationship between various entities.
- **Profile Integration**: A profile icon on the dashboard opens your GitHub profile. (Aditya0933)
- **Datatable with Pagination**: Displays all the EV data in a paginated table, allowing easy navigation through the records.
- **Modals for Details and Location**: 
  - **View Details**: Clicking this button opens a modal with detailed information about the selected vehicle.
  - **View Location**: Opens a modal displaying a dynamic map showing the exact location of the vehicle.
- **Modular and Structured Code**: The code is well-organized, with separate components for each functionality, making it clean and easy to maintain.
- **Deployment**:
  - **Frontend**: Hosted on [Vercel](https://map-up-ev-dashboard-kohl.vercel.app/).
  - **Backend**: Hosted on [Render](https://dashboard.render.com/).

### GitHub Repository
You can find the project source code on [GitHub](https://github.com/Aditya0933/MapUp-Ev-Dashboard).

### Utilities
- A `utils` folder is used to manage separate files for fetching data specific to the charts and the table, ensuring modularity and easy data management.

### Steps to Start the Project
1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aditya0933/MapUp-Ev-Dashboard.git
2. **Navigate to the project directory**:
   ```bash
   cd MapUp-Ev-Dashboard
3. **Install All dependencies**:
   ```bash
   npm install
4. **Run the development server**:
   ```bash
   npm run dev
5. **Open the app locally**:
   ```bash
   After running the above command, the project will be available at " http://localhost:3000 " on your browser. It may differ so open according to the your Terminal.

