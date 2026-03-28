import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EnrollmentService from "../services/enrollmentService";

const Enrollments = () => {
  const navigate = useNavigate();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEnrollments = async () => {
      try {
        const response = await EnrollmentService.getAll();

        // SAFETY: ensure array
        setEnrollments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error("Error fetching enrollments:", error);
        alert("Failed to load enrollments");
        setEnrollments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEnrollments();
  }, []);

  const handleDelete = async (enrollment) => {
    if (!window.confirm("Remove this enrollment?")) return;

    try {
      await EnrollmentService.remove(enrollment.id);
      setEnrollments((prev) =>
        prev.filter((e) => e.id !== enrollment.id)
      );
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
        <h2 className="text-2xl font-bold text-gray-800">Enrollments</h2>
        <button
          onClick={() => navigate("/enrollments/create")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Enrollment
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Course</th>
              <th className="p-3 text-left">Enroll Date</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {enrollments.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No enrollments found
                </td>
              </tr>
            ) : (
              enrollments.map((enrollment) => (
                <tr key={enrollment.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{enrollment.id}</td>
                  <td className="p-3">
                    {enrollment.student?.name || "-"}
                  </td>
                  <td className="p-3">
                    {enrollment.course?.name || "-"}
                  </td>
                  <td className="p-3">
                    {enrollment.createdAt
                      ? new Date(enrollment.createdAt).toLocaleDateString()
                      : "-"}
                  </td>
                  <td className="p-3">{enrollment.status}</td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/enrollments/edit/${enrollment.id}`)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(enrollment)}
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

export default Enrollments;
