// src/services/dashboardService.js
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL + "/dashboard";

class DashboardService 
{
  // Method to fetch dashboard data
  getDashboardData() 
  {
    return axios.get(API_URL);
  }
}

// Export an instance
export default new DashboardService();