// src/components/Sidebar.jsx
import React from 'react';
import { FaUserGraduate, FaChalkboardTeacher, FaBook, FaClipboardList, FaHome, FaSignOutAlt, FaBuilding  } from 'react-icons/fa';
import { FaLocust } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col p-5">
      <h1 className="text-2xl font-bold mb-8">School Admin</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/dashboard" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FaHome /> Dashboard
        </Link>
        <Link to="/students" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FaUserGraduate /> Students
        </Link>
        <Link to="/teachers" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FaChalkboardTeacher /> Teachers
        </Link>
        <Link to="/courses" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FaBook /> Courses
        </Link>
        <Link to="/departments" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FaBuilding  /> Departments
        </Link>
        <Link to="/enrollments" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FaClipboardList /> Enrollments
        </Link>
        <Link to="/roles" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FaClipboardList /> Roles
        </Link>
      
         <Link to="/" className="flex items-center gap-3 hover:bg-gray-700 p-2 rounded">
          <FaSignOutAlt size={18} /> Log out
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
