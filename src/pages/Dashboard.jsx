import React, { useEffect, useState } from "react";
import DashboardCard from "../components/DashboardCard";
import DashboardService from "../services/dashboardService";

const Dashboard = () => {
  const [stats, setStats] = useState([
    { title: "Total Students", count: 0 },
    { title: "Total Teachers", count: 0 },
    { title: "Total Courses", count: 0 },
    { title: "Total Enrollments", count: 0 },
  ]);

  const [recentEnrollments, setRecentEnrollments] = useState([]);

  useEffect(() => {
    // Call class method
      DashboardService.getDashboardData()
      .then((res) => {
        const data = res.data;
        console.log(data.totalStudents)
        setStats([
          { title: "Total Students", count: data.totalStudents },
          { title: "Total Teachers", count: data.totalTeachers },
          { title: "Total Courses", count: data.totalCourses },
          { title: "Total Enrollments", count: data.totalEnrollments },
        ]);

        setRecentEnrollments(data.recentEnrollments || []);
      })
      .catch((err) => {
        console.error("Error fetching dashboard data:", err);
      });
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen w-full">
      <h2 className="text-3xl font-bold mb-6">Dashboard</h2>

      {/* Dashboard cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, idx) => (
          <DashboardCard key={idx} title={stat.title} count={stat.count} />
        ))}
      </div>

      {/* Recent enrollments table */}
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Recent Enrollments</h3>

        {recentEnrollments.length === 0 ? (
          <p className="text-gray-500">No recent enrollments found.</p>
        ) : (
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Student</th>
                <th className="p-2 border">Course</th>
                <th className="p-2 border">Teacher</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentEnrollments.map((e, idx) => (
                <tr key={idx} className="hover:bg-gray-100">
                  <td className="p-2 border">{e.studentName}</td>
                  <td className="p-2 border">{e.courseName}</td>
                  <td className="p-2 border">{e.teacherName}</td>
                  <td className="p-2 border">{e.date}</td>
                  <td className="p-2 border">{e.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
