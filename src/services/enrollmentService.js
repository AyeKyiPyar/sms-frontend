import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:8080/api

class EnrollmentService {

  // ✅ Get all enrollments
  getAll() 
  {
   return axios.get(`${API_URL}/enrollments`);
  }

  // ✅ Get enrollment by ID (for edit)
  getById(id) 
  {
    return axios.get(`${API_URL}/enrollments/${id}`);
  }

  // ✅ Create new enrollment
  create(enrollmentDTO) 
  {
    return axios.post(`${API_URL}/enrollments/create`, enrollmentDTO);
  }

  // ✅ Update enrollment
  update(id, enrollmentDTO) 
  {
    return axios.put(`${API_URL}/enrollments/edit/${id}`, enrollmentDTO);
  }

  // ✅ Delete enrollment
  delete(id) 
  {
    return axios.delete(`${API_URL}/${id}`);
  }
}

export default new EnrollmentService();