import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import CourseService from "../services/courseService";

const CourseForm = () => 
{
  const { id } = useParams(); // get the course ID from URL
  const navigate = useNavigate();

  const [courseDTO, setCourseDTO] = useState({
    id: "",
    name: "",
    courseCode: "",
    credit: "",
   
  });

  // Fetch student data if editing
  useEffect(() => {
    if (id) {
      CourseService.getById(id)
        .then((res) => setCourseDTO(res.data))
        .catch((err) => console.error("Error fetching course:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setCourseDTO({
      ...courseDTO,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      if (id) 
      {
        // Edit existing course
        await CourseService.update(id, courseDTO);
        alert("Course updated successfully!");
      } 
      else 
      {
        // Create new course
        await CourseService.create(courseDTO);
        alert("Course added successfully!");
      }
      navigate("/courses");
    } catch (error) {
      console.error(error);
      alert("Failed to save course");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Course" : "Add Course"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          {courseDTO.id && (
            <input
              type="hidden"
              name="id"
              value={courseDTO.id}
            />
          )}

          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={courseDTO.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Course Code</label>
          <input
            type="text"
            name="courseCode"
            value={courseDTO.courseCode}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Credit</label>
          <input
            type="text"
            name="credit"
            value={courseDTO.credit}
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

export default CourseForm;
