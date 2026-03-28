import axios from "axios";

// Base API URL from Vite env
const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:8080/api

class DepartmentService 
{
  // Create a new department
  create(departmentDTO)
  {
    
    
    return axios.post(`${API_URL}/departments/create`, departmentDTO, {
    headers: {
        "Content-Type": "application/json"
    }
});

  }

  // Get all departments
  getAll() 
  {
    console.log("Get all");
    return axios.get(`${API_URL}/departments`);
  }

  // Get a department by ID
  getById(id) 
  {
    return axios.get(`${API_URL}/departments/${id}`);
  }

  // Optional: Update a department
  update(id, departmentData)
  {
    return axios.put(`${API_URL}/departments/${id}`, departmentData);
  }

  // Optional: Delete a department
  delete(id) 
  {
    return axios.delete(`${API_URL}/departments/${id}`);
  }
}

export default new DepartmentService();
