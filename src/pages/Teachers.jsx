import React, { useEffect, useState } from "react";
import TeacherService from "../services/teacherService";
import { useNavigate } from "react-router-dom";

const Teachers = () => 
{
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => 
  {
    const fetchTeachers = async () => 
      {
        try 
        {
          const response = await TeacherService.getAll();

          // SAFETY: ensure array
         // setTeachers(Array.isArray(response.data) ? response.data : []);
         console.log(response.data);
         setTeachers(response.data);
        } 
        catch (error) 
        {
          console.error(error);
          alert("Failed to fetch teachers");
          setTeachers([]);
        } 
        finally 
        {
          setLoading(false);
        }
    };

    fetchTeachers();
  }, []);

  const handleDelete = async (teacher) => 
  {
    if (!window.confirm(`Delete teacher ${teacher.name}?`)) return;

    try 
    {
      await TeacherService.remove(teacher.id);
      setTeachers((prev) => prev.filter((t) => t.id !== teacher.id));
    } 
    catch (err) 
    {
      alert("Delete failed");
    }
  };

  if (loading) 
  {
    return <div className="p-6">Loading...</div>;
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Teachers</h2>
        <button
          onClick={() => navigate("/teachers/create")}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          + Add Teacher
        </button>
      </div>

      {/* Table */}
      <div className="bg-white shadow rounded overflow-x-auto">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Teacher ID</th>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Designation</th>
              <th className="p-3 text-left">Department</th>
              <th className="p-3 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {teachers.length === 0 ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-gray-500">
                  No teachers found
                </td>
              </tr>
            ) : (
              teachers.map((teacher) => (
                <tr key={teacher.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{teacher.teacherID}</td>
                  <td className="p-3">{teacher.name}</td>
                  <td className="p-3">{teacher.email}</td>
                  <td className="p-3">{teacher.designation}</td>
                  <td className="p-3">
                    {teacher.department?.name || "-"}
                  </td>
                  <td className="p-3 text-center space-x-2">
                    <button
                      onClick={() => navigate(`/teachers/edit/${teacher.id}`)}
                      className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(teacher)}
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

export default Teachers;
