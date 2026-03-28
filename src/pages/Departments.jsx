import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DepartmentService from "../services/departmentService";

const Department = () => {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await DepartmentService.getAll();

        // SAFETY: ensure array
        setDepartments(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.error(error);
        alert("Failed to fetch departments");
        setDepartments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartments();
  }, []);

  const handleDelete = async (department) => {
    if (!window.confirm(`Delete department ${department.name}?`)) return;

    try {
      await DepartmentService.remove(department.id);
      setDepartments((prev) =>
        prev.filter((d) => d.id !== department.id)
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
        <h2 className="text-2xl font-bold text-gray-800">Departments</h2>
        <button
          onClick={() => navigate("/departments/create")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Department
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Description</th>
              <th className="p-3 text-left">Teacher</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {departments.length === 0 ? (
              <tr>
                <td colSpan="5" className="p-4 text-center text-gray-500">
                  No departments found
                </td>
              </tr>
            ) : (
              departments.map((department) => (
                <tr key={department.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{department.id}</td>
                  <td className="p-3">{department.name}</td>
                  <td className="p-3">{department.description}</td>
                  <td className="p-3">
                    {department.teacher?.name || "-"}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() =>
                        navigate(`/departments/edit/${department.id}`)
                      }
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(department)}
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

export default Department;
