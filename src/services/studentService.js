import axios from "axios";

// Base API URL from Vite env
const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:8080/api

class StudentService 
{
  // Create a new student
  create(studentDTO)
  {
    console.log(studentDTO);
    // studentData is an object like { name: "John", age: 20, email: "..." }
    return axios.post(`${API_URL}/students/create`, studentDTO, {
    headers: {
        "Content-Type": "application/json"
    }
});

  }

  // Get all students
  getAll() 
  {
    console.log("Get all");
    return axios.get(`${API_URL}/students`);
  }

  // Get a student by ID
  getById(id) 
  {
    return axios.get(`${API_URL}/students/${id}`);
  }

  // Optional: Update a student
  update(id, studentData)
  {
    return axios.put(`${API_URL}/students/${id}`, studentData);
  }

  // Optional: Delete a student
  delete(id) 
  {
    return axios.delete(`${API_URL}/students/${id}`);
  }
}

export default new StudentService();
