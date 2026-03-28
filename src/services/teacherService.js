import axios from "axios";

// Base API URL from Vite env
const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:8080/api

class TeacherService 
{
  // Create a new teacher
  create(teacherDTO)
  {    
    return axios.post(`${API_URL}/teachers/create`, teacherDTO);
  }

  // Get all students
  getAll() 
  {
    console.log("Get all");
    return axios.get(`${API_URL}/teachers`);
  }

  // Get a student by ID
  getById(id) 
  {
    return axios.get(`${API_URL}/teachers/${id}`);
  }

  // Optional: Update a student
  update(id, teacherData)
  {
    return axios.put(`${API_URL}/teachers/${id}`, teacherData);
  }

  // Optional: Delete a student
  delete(id) 
  {
    return axios.delete(`${API_URL}/teachers/${id}`);
  }
}

export default new TeacherService();
