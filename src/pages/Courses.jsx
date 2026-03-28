import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import CourseService from "../services/courseService";

const Courses = () => {
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await CourseService.getAll();
        setCourses(response.data); // Assuming backend returns array of courses
      } catch (error) {
        alert("Failed to fetch courses");
      }
    };

    fetchCourses();
  }, []);

  const handleEdit = (course) => {
    console.log('Edit course:', course);
    // You can open an edit modal or navigate to edit page
    navigate(`/courses/edit/${course.id}`);
  };

  const handleDelete = (course) => {
    if (window.confirm(`Delete course ${course.name}?`)) {
      setCourses(courses.filter(c => c.id !== course.id));
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Courses</h2>
        <button
          onClick={() => navigate("/courses/create")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          + Add Course
        </button>
      </div>

      {/* Courses Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">Course ID</th>
              <th className="py-2 px-4 border-b text-left">Course Name</th>
              <th className="py-2 px-4 border-b text-left">Course Code</th>
              <th className="py-2 px-4 border-b text-left">Credit</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.length > 0 ? (
              courses.map(course => (
                <tr key={course.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b">{course.id}</td>
                  <td className="py-2 px-4 border-b">{course.name}</td>
                  <td className="py-2 px-4 border-b">{course.courseCode}</td>
                  <td className="py-2 px-4 border-b">{course.credit}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleEdit(course)}
                      className="text-blue-500 mr-2 hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(course)}
                      className="text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No courses available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Courses;
