import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import TeacherService from "../services/teacherService";
import DepartmentService from "../services/departmentService";

const TeacherForm = () => {
  const { id } = useParams(); // edit if id exists
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [departments, setDepartments] = useState([]);

  const [teacher, setTeacher] = useState({
    name: "",
    email: "",
    password: "",
    teacherID: "",
    designation: "",
    department: null
  });

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    loadDepartments();

    if (isEdit) {
      loadTeacher();
    }
  }, [id]);

  const loadDepartments = async () => {
    const res = await DepartmentService.getAll();
    setDepartments(res.data);
  };

  const loadTeacher = async () => {
    const res = await TeacherService.getById(id);
    setTeacher({
      ...res.data,
      password: "" // never show password on edit
    });
  };

  // ---------------- HANDLERS ----------------
  const handleChange = (e) => 
  {
    setTeacher({
      ...teacher,
      [e.target.name]: e.target.value
    });
  };

  const handleDepartmentChange = (e) => 
  {
    const deptId = e.target.value;
    const dept = departments.find(d => d.id === Number(deptId));

    setTeacher({
      ...teacher,
      department: dept
    });
  };

  const handleSubmit = async (e) => 
  {
    e.preventDefault();

    try 
    {
      if (isEdit) 
        {
        await TeacherService.update(id, teacher);
        alert("Teacher updated successfully");

      } 
      else 
        {
        await TeacherService.create(teacher);
        alert("Teacher created successfully");
      }
      navigate("/teachers");

    } 
    catch (err) 
    {
      console.error(err);
      alert("Operation failed");
    }
  };

  // ---------------- UI ----------------
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-2xl font-bold mb-4">
          {isEdit ? "Edit Teacher" : "Add Teacher"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Name"
            value={teacher.name}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={teacher.email}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          {!isEdit && (
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={teacher.password}
              onChange={handleChange}
              required
              className="w-full border p-2 rounded"
            />
          )}

          <input
            type="text"
            name="teacherID"
            placeholder="Teacher ID"
            value={teacher.teacherID}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <input
            type="text"
            name="designation"
            placeholder="designation"
            value={teacher.designation}
            onChange={handleChange}
            required
            className="w-full border p-2 rounded"
          />

          <select
            onChange={handleDepartmentChange}
            value={teacher.department?.id || ""}
            required
            className="w-full border p-2 rounded"
          >
            <option value="">Select Department</option>
            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>

          <div className="flex gap-2">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              {isEdit ? "Update" : "Save"}
            </button>

            <button
              type="button"
              onClick={() => navigate("/teachers")}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default TeacherForm;
