import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import StudentService from "../services/studentService";

const StudentForm = () => 
{
  const { id } = useParams(); // get the student ID from URL
  const navigate = useNavigate();

  const [studentDTO, setStudentDTO] = useState({
    name: "",
    email: "",
    password: "",
    studentID: "",
    grade: "",
    role: { name: "STUDENT" }
  });

  // Fetch student data if editing
  useEffect(() => {
    if (id) 
    {
      StudentService.getById(id)
        .then((res) => setStudentDTO(res.data))
        .catch((err) => console.error("Error fetching student:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setStudentDTO({
      ...studentDTO,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      if (id) 
      {
        // Edit existing student
        await StudentService.update(id, studentDTO);
        alert("Student updated successfully!");
      } 
      else 
      {
        // Create new student
        await StudentService.create(studentDTO);
        alert("Student added successfully!");
      }
      navigate("/students");
    } catch (error) {
      console.error(error);
      alert("Failed to save student");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Student" : "Add Student"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          {studentDTO.id && (
            <input
              type="hidden"
              name="id"
              value={studentDTO.id}
            />
          )}

          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={studentDTO.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={studentDTO.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Student ID</label>
          <input
            type="text"
            name="studentID"
            value={studentDTO.studentID}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Grade</label>
          <input
            type="text"
            name="grade"
            value={studentDTO.grade}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate("/students")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentForm;
