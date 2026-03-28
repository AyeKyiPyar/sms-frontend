// src/pages/EnrollmentForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import EnrollmentService from "../services/enrollmentService";
import StudentService from "../services/studentService";
import CourseService from "../services/courseService";

const EnrollmentForm = () => {
  const { id } = useParams(); // edit mode if id exists
  const navigate = useNavigate();

  const [students, setStudents] = useState([]);
  const [courses, setCourses] = useState([]);

  const [enrollment, setEnrollment] = useState({

    student: null,
    course: null,
    status: ""
  });

  /* Load students & courses */
  useEffect(() => {
    StudentService.getAll().then(res => setStudents(res.data));
    CourseService.getAll().then(res => setCourses(res.data));
  }, []);

  /* Load enrollment for edit */
  useEffect(() => {
    if (id) 
    {
      EnrollmentService.getById(id).then(res => {
        setEnrollment({
         
          studentId: res.data.student.id,
          courseId: res.data.course.id,
          status: res.data.status
        });
      });
    }
  }, [id]);

  // For top-level fields like "status"
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "status") {
      setEnrollment(prev => ({ ...prev, status: value }));
    }
  };

  // For student object
  const handleStudentChange = (student) => {
    setEnrollment(prev => ({ ...prev, student }));
  };

  // For course object
  const handleCourseChange = (course) => {
    setEnrollment(prev => ({ ...prev, course }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    

    try {
      if (id) 
      {
        await EnrollmentService.update(id, enrollment);
        alert("Enrollment updated");

      } 
      else 
      {
        await EnrollmentService.create(enrollment);
        alert("Enrollment created");
      }
      navigate("/enrollments");
    } catch (err) {
      alert("Failed to save enrollment");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Enrollment" : "New Enrollment"}
      </h2>

      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow max-w-xl space-y-4"
      >
        {/* Enrollment */}
        <div>
        {/* {enrollment.id && (
            <input
              type="hidden"
              name="id"
              value={enrollment.id}
            />
          )} */}
          <label className="block mb-1 font-medium">Student</label>
          <select 
            onChange={e => handleStudentChange({ id: e.target.value, name: e.target.selectedOptions[0].text })}
            className="w-full border px-3 py-2 rounded"
            >
            <option value="">-- Select student --</option>
            {students.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>
        </div>

        {/* Course */}
        <div>
          <label className="block mb-1 font-medium">Course</label>
          <select
            name="courseId"
            value={enrollment.course?.id || ""}
            onChange={e => handleCourseChange({ id: e.target.value, title: e.target.selectedOptions[0].text })}
            required
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Course --</option>
            {courses.map(c => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="block mb-1 font-medium">Status</label>
          <select
            name="status"
            value={enrollment.status}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="Active">Active</option>
            <option value="Completed">Completed</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Save
          </button>

          <button
            type="button"
            onClick={() => navigate("/enrollments")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default EnrollmentForm;
