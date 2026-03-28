import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DepartmentService from "../services/departmentService";

const DepartmentForm = () => 
{
  const { id } = useParams(); // get the student ID from URL
  const navigate = useNavigate();

  const [departmentDTO, setDepartmentDTO] = useState({
    id: "",
    name: "",
    description: "",
  });

  // Fetch department data if editing
  useEffect(() => {
    if (id) {
      DepartmentService.getById(id)
        .then((res) => setDepartmentDTO(res.data))
        .catch((err) => console.error("Error fetching department:", err));
    }
  }, [id]);

  const handleChange = (e) => {
    setDepartmentDTO({
      ...departmentDTO,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try 
    {
      if (id) 
      {
        // Edit existing department
        await DepartmentService.update(id, departmentDTO);
        alert("Department updated successfully!");
      } 
      else 
      {
        // Create new department
        await DepartmentService.create(departmentDTO);
        alert("Department added successfully!");
      }
      navigate("/departments");
    } 
    catch (error) 
    {
      console.error(error);
      alert("Failed to save department");
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Department" : "Add Department"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 w-full">
        <div>
          {departmentDTO.id && (
            <input
              type="hidden"
              name="id"
              value={departmentDTO.id}
            />
          )}

          <label className="block mb-1 font-medium">Name</label>
          <input
            type="text"
            name="name"
            value={departmentDTO.name}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <input
            type="text"
            name="description"
            value={departmentDTO.description}
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
            onClick={() => navigate("/departments")}
            className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default DepartmentForm;
