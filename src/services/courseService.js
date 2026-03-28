import axios from "axios";

// Base API URL from Vite env
const API_URL = import.meta.env.VITE_API_URL; // e.g., http://localhost:8080/api

class CourseService 
{
  // Create a new student
  create(courseDTO)
  {
   
    return axios.post(`${API_URL}/courses/create`, courseDTO, {
    headers: {
        "Content-Type": "application/json"
    }
});

  }

  // Get all courses
  getAll() 
  {
    console.log("Get all");
    return axios.get(`${API_URL}/courses`);
  }

  // Get a course by ID
  getById(id) 
  {
    return axios.get(`${API_URL}/courses/${id}`);
  }

  // Optional: Update a course
  update(id, courseData)
  {
    return axios.put(`${API_URL}/courses/${id}`, courseData);
  }

  // Optional: Delete a course
  delete(id) 
  {
    return axios.delete(`${API_URL}/courses/${id}`);
  }
}

export default new CourseService();
