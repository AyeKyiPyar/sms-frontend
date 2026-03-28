import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

class AuthService 
{
  // Login method
  login(email, password) 
  {
    return axios.post(`${API_URL}/login`, { email, password });
  }

  // Optional: logout method
  logout() 
  {
    // For example, remove token from localStorage
    localStorage.removeItem("token");
  }

}

export default new AuthService();
