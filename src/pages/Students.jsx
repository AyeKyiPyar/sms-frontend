import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StudentService from "../services/studentService";

const Students = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await StudentService.getAll();

        // SAFETY: ensure array
        setStudents(Array.isArray(response.data) ? response.data : []);
      } 
      catch (error) 
      {
        console.error("Error fetching students:", error);
        alert("Failed to fetch students");
        setStudents([]);
      } 
      finally 
      {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  const handleDelete = async (student) => {
    if (!window.confirm(`Delete student ${student.name}?`)) return;

    try {
      await StudentService.remove(student.id);
      setStudents((prev) => prev.filter((s) => s.id !== student.id));
    } catch (error) {
      alert("Delete failed");
    }
  };

  if (loading) {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Students</h2>
        <button
          onClick={() => navigate("/students/create")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Student
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Student ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Grade</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No students found
                </td>
              </tr>
            ) : (
              students.map((student) => (
                <tr key={student.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{student.studentID}</td>
                  <td className="p-3">{student.name}</td>
                  <td className="p-3">{student.email}</td>
                  <td className="p-3">{student.grade}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/students/edit/${student.id}`)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(student)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Students;
