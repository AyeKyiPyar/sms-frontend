import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Students from "./pages/Students";
import Teachers from "./pages/Teachers";
import Courses from "./pages/Courses";
import Enrollments from "./pages/Enrollments";
import StudentForm from "./pages/StudentForm";
import TeacherForm from "./pages/TeacherForm";
import Departments from "./pages/Departments";
import DepartmentForm from './pages/DepartmentForm';
import CourseForm from "./pages/CourseForm";
import EnrollmentForm from "./pages/EnrollmentForm";
import Roles from "./pages/Roles";
import RoleForm from "./pages/RoleForm";


function App() {
  
  return (
    <Routes>
      {/* Public Login */}
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      {/* Main layout routes */}
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/students" element={<Students />} />
        <Route path="/students/create" element={<StudentForm />} />
        <Route path="/students/edit/:id" element={<StudentForm />} />

        <Route path="/teachers" element={<Teachers />} />
        <Route path="/teachers/create" element={<TeacherForm />} />
        <Route path="/teachers/edit/:id" element={<TeacherForm />} />

        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/create" element={<DepartmentForm />} />
        <Route path="/departments/edit/:id" element={<DepartmentForm />} />

        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/create" element={<CourseForm />} />
        <Route path="/courses/edit/:id" element={<CourseForm />} />
        
        <Route path="/enrollments" element={<Enrollments />} />
        <Route path="/enrollments/create" element={<EnrollmentForm />} />
        <Route path="/enrollments/edit/:id" element={<EnrollmentForm />} />

        {/* <Route path="/roles" element={<Roles />} />
        <Route path="/enrollments/create" element={<RoleForm />} />
        <Route path="/enrollments/edit/:id" element={<RoleForm />} /> */}
      </Route>

      {/* Optional: catch all */}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
